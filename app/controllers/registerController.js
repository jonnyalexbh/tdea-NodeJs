const Service = require('../service');

exports.create = (req, res) => res.render('register');

exports.store = (req, res) => {
  Service.registerUser(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch(() => {
      res.render('register', { message: 'La informacion ingresada ya existe en nuestra base de datos' });
    });
};
