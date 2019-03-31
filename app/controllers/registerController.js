const functions = require('../functions');

let registeredUsers = [];

/**
* create user
*
*/
exports.create = (req, res) => {
  res.render('register');
};

/**
* strore user
*
*/
exports.store = (req, res) => {
  registeredUsers = functions.loadUsers();

  const {
    identity, name, email, phone,
  } = req.body;

  const registerUser = {
    identity,
    name,
    email,
    phone,
    password: identity,
    rol: 'aspirante',
  };

  if (functions.checkExistsUser(registerUser.identity)) {
    res.redirect('/register');
  } else {
    registeredUsers.push(registerUser);
    functions.storeUsers(registeredUsers);
    res.redirect('/');
  }
};
