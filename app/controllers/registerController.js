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
    role: 'aspirante',
  };

  if (functions.checkExistsUser(registerUser.identity)) {
    res.render('register', { message: 'La informacion ingresada ya existe en nuestra base de datos' });
  } else {
    registeredUsers.push(registerUser);
    functions.storeUsers(registeredUsers);
    res.redirect('/');
  }
};
