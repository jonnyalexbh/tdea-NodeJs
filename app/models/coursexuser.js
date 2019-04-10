const { Schema } = require('mongoose');

const connection = require('./connection');

const CourseByStudent = new Schema({
  userId: {
    type: String,
    required: true,
    minlength: 3,
  },
  courseId: {},
});

module.exports = connection.model('CourseByStudent', CourseByStudent);
