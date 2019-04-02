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

  /**
   * update student
   *
   */

  collection.updateOne({ name: 'jonnyalexbh' }, {
    $set:
    {
      english: 5, programming: 5
    }
  }, (err, result) => {
    if (err) {
      return console.log('error when updating' + result);
    }
    console.log('it was updated correctly');
  });

  collection.updateMany({ math: 3 }, {
    $set: { math: 4 }
  }, (err, result) => {
    if (err) {
      return console.log('error when updating' + result);
    }
    console.log('it was updated correctly');
  });

  /**
  * find student
  *
  */

  // collection.findOne({ name: 'jonnyalexbh' }, (err, result) => {
  //   if (err) {
  //     return console.log('error');
  //   }
  //   console.log(result);
  // })

  // collection.find({ math: 3 }).toArray((err, result) => {
  //   if (err) {
  //     return console.log('error');
  //   }
  //   console.log(result);
  // })

  /**
  * insert student
  *
  */

  // collection.insertOne({
  //   name: 'jonnyalexbh',
  //   math: 3,
  //   english: 4,
  //   programming: 4
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('error entering student');
  //   }
  //   else {
  //     return console.log(result.ops);
  //   }
  // })

  client.close();
});
