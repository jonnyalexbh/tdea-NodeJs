const fs = require('fs');

const Course = require('../models/course');
const User = require('../models/user');

const loadCourses = async () => Course.find({});

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
  fs.writeFile('data/courses-per-person.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso registrado para el estudiante');
  });
};

/**
* returns courses available
*
*/
const getCoursesAvailable = async () => Course.find({ state: 'disponible' });

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

  return false;
};

const createCourse = async (data) => {
  const course = await Course.findOne({ id: data.id });
  if (course) throw new Error('Course already exists');
  const newCourse = new Course(data);
  await newCourse.save();
};

const logIn = async ({ user, pass }) => {
  const model = User.findOne({ identity: user, password: pass });
  if (!model) throw new Error('User not found');
  return model;
};

const registerUser = async (data) => {
  const existsUser = await User.findOne({ identity: data.identity });
  console.log(existsUser);
  if (existsUser) throw new Error('User already exists');
  const user = new User({ ...data, password: data.identity });
  await user.save();
};

const courseById = async courseId => Course.findOne({ id: courseId });

module.exports = {
  createCourse,
  loadCourses,
  registerUser,
  courseById,
  loadUsers,
  loadCoursesPerPerson,
  storeCourses,
  storeUsers,
  storeCoursesPerPerson,
  getCoursesAvailable,
  checkExistsUser,
  isAdmin,
  isLogged,
  logIn,
};
