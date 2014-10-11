mongopromise
============

A simple wrapper around mongodb-native with Q promises.


Life is complicated, right?  So perhaps using Node's mongo-db native module should not? Why bother with annoying callbacks with Every single node-mongodb call? Connect, callback, find database, callback, find collection callback, insert or do a query and callback. This simple wrapper will help you achieve the most common MongoDB tasks with a single function call. This is a work in progress. Please feel free to report bugs and suggest features!

Usage:

1. Clone repository into your project (npm module coming soon!), and place within node_modules.
2. Change config.json to your mongodb server's hostname and port (database setting does not yet work, uses 'local' by default).
3. In your project:

var mongopromise = require('mongopromise');


Now, you can:

mongopromise.doMongoInsert({property:'value',another_property:'value'}, 'collection');

or: 

mongopromise.doMongoFind('collection',{id: '1'});


All functions return Q promises, so you can use .then (function (docs){...}); to access the results of your query.

More funtions coming soon.