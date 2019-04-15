const mongoose = require('mongoose');

const {
  DB_URL,
  DB_USER,
  DB_USER_PASSWORD,
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  user: DB_USER,
  pass: DB_USER_PASSWORD,
});

const { connection } = mongoose;
connection.on('error', error => console.error('Error connecting to database', error));
connection.on('connected', () => console.log('Succesfully connected to database'));

module.exports = connection;
