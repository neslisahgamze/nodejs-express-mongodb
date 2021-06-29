const MongoClient = require('mongodb').MongoClient;

module.exports = async (startDate, endDate, minCount, maxCount) => {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;
    const dbName = process.env.DATABASE_NAME;

    // Connect
    return client
      .connect()
      .then(client =>
        client
          .db(dbName)
          .collection('records')
          .aggregate([
            {
              '$match': {
                'createdAt': {
                  '$gte': new Date(startDate),
                  '$lt': new Date(endDate)
                }
              }
            },
            {
              '$project': {
                'key': '$key', 
                'createdAt': '$createdAt', 
                'totalCount': {
                  '$sum': '$counts'
                }
              }
            }, 
            {
              '$match': {
                'totalCount': {
                  '$lt': Number(maxCount), 
                  '$gt': Number(minCount)
                }
              }
            },
            { $unset: ["_id"] } // Hide _id from aggregation
          ])
        .toArray()
      )
}