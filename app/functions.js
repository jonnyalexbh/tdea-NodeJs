const fs = require('fs');

let registeredUsers = [];

/**
* users
*
*/
const loadUsers = () => {
  try {
    return require('../data/registered.json');
  } catch (error) {
    return [];
  }
};

/**
* storeUsers
*
*/
const storeUsers = (users) => {
  const data = JSON.stringify(users);
  fs.writeFile('data/registered.json', data, (err) => {
    if (err) throw (err);
    console.log('Aspirante registrado correctamente');
  });
};

/**
* checkExistsUser
*
*/
const checkExistsUser = (identity) => {
  registeredUsers = loadUsers();
  return registeredUsers.find(search => search.identity === identity);
};


/**
* isAdmin
*
*/
const isAdmin = (req) => {
  if (req.session.userRole === 'admin') {
    return 1;
  }
  return 0;
};

/**
* isLogged
*
*/
const isLogged = (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
  }
  return 0;
};

module.exports = {
  loadUsers,
  storeUsers,
  checkExistsUser,
  isAdmin,
  isLogged,
};
