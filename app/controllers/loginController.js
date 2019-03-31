const functions = require('../functions');

let registeredUsers = [];

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
  registeredUsers = functions.loadUsers();
  const check = registeredUsers
    .find(search => search.identity === req.body.user
      && search.password === req.body.pass);

  if (check) {
    req.session.loggedIn = 1;
    req.session.userId = check.identity;
    req.session.userRole = check.role;
    res.render('main', { checkAdmin: functions.isAdmin(req) });
  } else {
    res.render('index', { message: 'Estas credenciales no coinciden con nuestros registros.' });
  }
};

/**
* main
*
*/
exports.main = (req, res) => {
  functions.checkLogged(req, res);
  res.render('main', { checkAdmin: functions.isAdmin(req) });
};
