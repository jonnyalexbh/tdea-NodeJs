Student = require('../models/student');

/**
* create notes
*
*/
const create = (req, res) => {
  res.render('record-notes');
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
      res.render('record-notes', { show: error });
    }
    res.render('record-notes', { show: result });

  });
};

module.exports = {
  create,
  store,
}
