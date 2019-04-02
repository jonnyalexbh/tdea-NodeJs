const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ecommerce';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {

  if (err) {
    return console.log('Error when connecting');
  }

  console.log("Connected successfully");

  const db = client.db(dbName);
  client.close();
});
