
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  math: {
    type: Number,
  },
  english: {
    type: Number,
  },
  programming: {
    type: Number,
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
