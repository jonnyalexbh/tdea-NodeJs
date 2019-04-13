const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  dbName: 'tdea_db',
  useNewUrlParser: true,
});

const { connection } = mongoose;
connection.on('error', error => console.error('Error connecting to database', error));
connection.on('connected', () => console.log('Succesfully connected to database'));

module.exports = connection;
