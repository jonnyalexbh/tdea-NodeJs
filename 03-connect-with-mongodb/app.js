const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'dbcourse';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {

  if (err) {
    return console.log('Error when connecting');
  }

  console.log("Connected successfully");
  const db = client.db(dbName);

  const collection = db.collection('students');
  collection.insertOne({
    name: 'jonnyalexbh',
    math: 3,
    english: 4,
    programming: 4
  }, (err, result) => {
    if (err) {
      return console.log('error entering student');
    }
    else {
      return console.log(result.ops);
    }
  })

  client.close();
});
