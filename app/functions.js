const fs = require('fs');

let registeredUsers = [];

/**
*  load courses
*
*/
const loadCourses = () => {
  try {
    return require('../data/courses.json');
  } catch (error) {
    return [];
  }
};

/**
* storeCourses
*
*/
const storeCourses = (courses) => {
  const data = JSON.stringify(courses);
  fs.writeFile('data/courses.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso guardado correctamente');
  });
};

/**
* loadUsers
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
* loadCoursesPerPerson
*
*/
const loadCoursesPerPerson = () => {
  try {
    return require('../data/courses-per-person.json');
  } catch (error) {
    return [];
  }
};

/**
* storeCoursesPerPerson
*
*/
const storeCoursesPerPerson = (info) => {
  const data = JSON.stringify(info);
  fs.writeFile('../data/courses-per-person.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso registrado para el estudiante');
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
  loadCourses,
  loadUsers,
  loadCoursesPerPerson,
  storeCourses,
  storeUsers,
  storeCoursesPerPerson,
  checkExistsUser,
  isAdmin,
  isLogged,
};
