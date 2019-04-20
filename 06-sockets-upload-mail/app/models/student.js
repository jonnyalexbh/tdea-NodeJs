
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  math: {
    type: Number,
    default: 0,
    min: 0,
    max: [5, 'enter a number in math'],
  },
  english: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  programming: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  avatar: {
    type: Buffer,
  }
});

StudentSchema.plugin(uniqueValidator);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
