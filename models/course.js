const { Schema } = require('mongoose');

const connection = require('./connection');

const Course = new Schema({
  id: {
    type: Number,
    required: true,
    min: 1,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  modality: {
    type: String,
    enum: ['Presencial', 'Virtual'],
  },
  workload: {
    type: Number,
    min: 1,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  state: {
    type: String,
    enum: ['disponible', 'cerrado'],
    required: true,
    default: 'disponible',
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = connection.model('Course', Course);
