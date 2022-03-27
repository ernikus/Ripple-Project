var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports.stworzkolekcje = function (nazwabazy,kolekcja){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(nazwabazy);
  dbo.createCollection(kolekcja, function(err, res) {
    if (err) console.log("Wystapil blad: " + err)
    else console.log("Stworzono kolekcje!");
    db.close();
  });
}); 
  }
