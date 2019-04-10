const functions = require('../service');

let registeredUsers = [];

/**
* login
*
*/
exports.index = (req, res) => res.render('index');

/**
* authenticated
*
*/
exports.authenticated = (req, res) => {
  functions.logIn(req.body)
    .then((data) => {
      const sessionData = {
        loggedIn: 1,
        userId: data.identity,
        name: data.name,
        email: data.email,
        phone: data.phone,
        userRole: data.role,
      };
      Object.assign(req.session, sessionData);
      res.render('main', { req });
    })
    .catch(() => {
      res.render('index', { message: 'Estas credenciales no coinciden con nuestros registros.' });
    });
};

exports.main = (req, res) => res.render('main', { req });

/**
* logout
*
*/
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
