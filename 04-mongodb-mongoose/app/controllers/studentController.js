Student = require('../models/student');

/**
* index
*
*/
const index = (req, res) => {
  Student.find({}).exec((error, response) => {
    if (error) {
      return console.log(error);
    }
    res.render('notes', { list: response });
  })
}

/**
* create notes
*
*/
const create = (req, res) => {
  res.render('create-notes');
};

/**
* store notes
*
*/
const store = (req, res) => {
  let student = new Student({
    name: req.body.name,
    math: req.body.math,
    english: req.body.english,
    programming: req.body.programming,
  });

  student.save((error, result) => {
    if (error) {
      res.render('create-notes', { show: error });
    }
    res.render('create-notes', { show: result });

  });
};

module.exports = {
  index,
  create,
  store,
}
