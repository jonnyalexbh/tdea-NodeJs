const { Schema } = require('mongoose');

const connection = require('./connection');

const User = new Schema({
  identity: {
    type: String,
    required: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 7,
  },
  role: {
    type: String,
    required: true,
    enum: ['aspirante', 'admin', 'docente'],
    default: 'aspirante',
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  online: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = connection.model('User', User);
