var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports.wprowadzjedendokument = function (nazwabazy,kolekcja,wprowadzanyobiekt){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(nazwabazy);
    dbo.collection(kolekcja).insertOne(wprowadzanyobiekt, function(err, res) {
      if (err) throw err;
      console.log("1 dokument wprowadzony");
      db.close();
    });
  });
}
