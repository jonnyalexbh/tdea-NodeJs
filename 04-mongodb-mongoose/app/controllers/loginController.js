Student = require('../models/student');
const bcrypt = require('bcrypt');

/**
* login
*
*/
exports.index = (req, res) => {
  res.render('index');
};

/**
* authenticated
*
*/
exports.authenticated = (req, res) => {
  Student.findOne({ name: req.body.user }, (error, result) => {
    if (error) {
      return console.log(error);
    }
    if (!result) {
      return res.render('index', { message: 'user not found' });
    }

    if (!bcrypt.compareSync(req.body.pass, result.password)) {
      return res.render('index', { message: 'password is not correct' });
    }

    return res.render('main', { message: result.name });
  })
};

/**
* main
*
*/
exports.main = (req, res) => {
  res.render('main', { req });
};
