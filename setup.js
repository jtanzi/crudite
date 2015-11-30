//Run once to set up Mongo database and collections for Crudite to operate on.

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/crudite';


var insertDocument = function(db, callback) {
   db.collection('recipes').insertOne( {
      "title" : "Stone Soup",
      "author" : "Joel Tanzi",
      "ingredients" : [ "1 stone", "4 cups water" ],
      "prep_time" : "15",
      "instructions" : "1. Boil water. 2. Add stone. 3. Boil for 15 minute and serve.",
      "contains" : [ "stone", "water" ]
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the recipes collection.");
    callback(result);
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
    db.close();
  });
});
