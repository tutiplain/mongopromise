var mongo = require("mongodb");
var Q = require("q");


var readFileWithPromise = Q.denodeify(require('fs').readFile);

function readConfig()
{
    var defer = Q.defer();
    readFileWithPromise(__dirname+"/config.json")
    .then(function (data)
    {
       defer.resolve(JSON.parse(data)); 
    },
    function (err)
    {
        defer.reject(err);
    }).done();
    return defer.promise;
}


function doMongoInsert(object,col_name)
{
    var defer = Q.defer();
    
    readConfig().then(function(config) {
        try {
            mongo.MongoClient.connect("mongodb://"+config.host+":"+config.port.toString()+"/local", function(err, db) {
                
                if(err) {console.log("Error in db():" + err);defer.reject(err);return defer.promise;}
                console.log("db abierto");
                db.collection(col_name,function(err,col)
                {
                   if(err) {console.log("Error in collection(): "+err);defer.reject(err);return defer.promise;}
                   console.log("Collection abierto");
                   col.insert(object,function (err,records)
                   {
                       if(err) {defer.reject(err);}
                       else    {defer.resolve(records);}
                       db.close();
                   });
               });
            });
        } catch(ex) { defer.reject(ex); return defer.promise;} 
    });
    return defer.promise;
}

function doMongoFind(col_name,query)
{
    var defer = Q.defer();
    readConfig().then(function(config)
    {
        mongo.connect("mongodb://"+config.host+":"+config.port+"/local", function(err, db) 
        {
            if (err) {defer.reject(err);return defer.promise;}
            db.collection(col_name,function(err,col)
            {
                 if (err) {defer.reject(err);return defer.promise;}
                 col.find(query,function(err,cursor)
                 {
                         cursor.toArray( function (err,docs)
                         {
                             if(err) {defer.reject(err);return defer.promise;}
                             defer.resolve(docs);
                             db.close();
                         });
                 });
            });
         });
        
    });
    
    return defer.promise;
}


exports.doMongoInsert = doMongoInsert;
exports.readFileWithPromise = readFileWithPromise;
exports.doMongoFind = doMongoFind;