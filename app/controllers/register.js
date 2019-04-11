const Service = require('../service');

exports.create = (req, res) => {
  res.render('register');
};

exports.store = (req, res) => {
  Service.registerUser(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      res.render('register', { message: error.message });
    });
};
