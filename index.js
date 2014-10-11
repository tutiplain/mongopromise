var mongopromise = require(__dirname+'/mongopromise.js');


/*mongopromise.doMongoInsert({user:'omar',password:'yomismo'},'users').then(function(){
    console.log("Record Inserted");},
    function (err) { console.log(err);} 
);*/

mongopromise.doMongoFind('users',{user:'omar'}).then(function (docs)
 {
     console.log(docs);
 },
function (err)
{
    console.log(err);
});    



