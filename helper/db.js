const MongoClient = require('mongodb').MongoClient;

module.exports = () => {
    const uri = process.env.MONGODB_URI;

    MongoClient.connect(uri, function (err, db) {
        if (err) throw err
      
        db.collection('mammals').find().toArray(function (err, result) {
          if (err) throw err
      
          console.log(result)
        })
      })
}
