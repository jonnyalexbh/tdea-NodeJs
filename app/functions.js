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

module.exports = {
  loadUsers,
  storeUsers,
  checkExistsUser,
};
