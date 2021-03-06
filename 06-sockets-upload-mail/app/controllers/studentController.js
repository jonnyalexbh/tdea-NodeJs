Student = require('../models/student');
const bcrypt = require('bcrypt');

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
    password: bcrypt.hashSync(req.body.password, 10),
    math: req.body.math,
    english: req.body.english,
    programming: req.body.programming,
    avatar: req.file.buffer,
  });

  student.save((error, result) => {
    if (error) {
      res.render('create-notes', { show: error });
    }
    res.render('create-notes', { show: result });

  });
};

/**
* edit notes
*
*/
const edit = (req, res) => {
  Student.findById(req.params.id).exec((error, notes) => {
    if (error) {
      return console.log(error);
    }
    res.render('edit-notes', { notes: notes });
  })
};

/**
* update notes
*
*/
const update = (req, res) => {
  Student.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (error, result) => {
    if (error) {
      return console.log(error);
    }
    res.render('edit-notes', {
      notes: {
        id: result.id,
        name: result.name,
        math: result.math,
        english: result.english,
        programming: result.programming
      }
    });
  })
};

/**
* destroy notes
*
*/
const destroy = (req, res) => {
  Student.findOneAndDelete({ _id: req.params.id }, req.body, (error, result) => {
    if (error) {
      return console.log(error);
    }
    if (!result) {
      return console.log('the student was not found');
    }
    res.redirect('/notes');
  })
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
}
