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
    res.redirect('/main');
  } else {
    res.render('index', { message: 'Estas credenciales no coinciden con nuestros registros.' });
  }
};
