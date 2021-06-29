const MongoClient = require('mongodb').MongoClient;

module.exports = () => {
    const uri = "mongodb://localhost:27017/animals";

    MongoClient.connect(uri, function (err, db) {
        if (err) throw err
      
        db.collection('mammals').find().toArray(function (err, result) {
          if (err) throw err
      
          console.log(result)
        })
      })
}
