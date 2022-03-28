var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports.stworzdb = function (nazwa){
    MongoClient.connect(url + nazwa, function (err, db) {
      if (err) throw err;
      console.log("Baza stworzona!");
      db.close();
    });
  }
