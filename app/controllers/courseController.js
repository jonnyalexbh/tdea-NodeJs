const fs = require('fs');
const functions = require('../functions');

let coursesList = [];
let registeredPeople = [];
let coursePerson = [];

/**
* returns all courses
*
*/
const allCourses = () => {
  try {
    coursesList = require('../../data/courses.json');
  } catch (error) {
    return [];
  }

  return [];
};

/**
* people
*
*/
const people = () => {
  try {
    registeredPeople = require('../../data/registered.json');
  } catch (error) {
    return [];
  }

  return [];
};

/**
* returns coursesPerPerson
*
*/
const coursesPerPerson = () => {
  try {
    coursePerson = require('../../data/courses-per-person.json');
  } catch (error) {
    return [];
  }

  return [];
};

/**
* saveCourse
*
*/
const saveCourse = () => {
  const data = JSON.stringify(coursesList);
  fs.writeFile('courses.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso guardado correctamente');
  });
};

/**
* savePerson
*
*/
const savePerson = () => {
  const data = JSON.stringify(registeredPeople);
  fs.writeFile('registered.json', data, (err) => {
    if (err) throw (err);
    console.log('Aspirante registrado correctamente');
  });
};

/**
* saveCoursesPerPerson
*
*/
const saveCoursesPerPerson = () => {
  const data = JSON.stringify(coursePerson);
  fs.writeFile('courses-per-person.json', data, (err) => {
    if (err) throw (err);
    console.log('curso registrado para el estudiante');
  });
};

/**
* show all courses
*
*/
exports.index = function (req, res) {
  allCourses();
  res.render('courses', { courses: coursesList, checkAdmin: functions.isAdmin(req) });
};

/**
* show course
*
*/
exports.show = (req, res) => {
  allCourses();
  const show = coursesList.find(search => search.id == req.params.id);
  res.render('show-course', { course: show });
};

/**
* store a course
*
*/
exports.store = (req, res) => {
  allCourses();

  const {
    id, name, modality, workload, description, cost,
  } = req.body;

  const course = {
    id,
    name,
    modality,
    workload,
    description,
    state: 'disponible',
    cost,
  };

  const duplicate = coursesList.find(search => search.id === course.id);

  if (!duplicate) {
    coursesList.push(course);
    saveCourse();
    res.redirect('/courses');
  } else {
    console.log('Ya existe otro curso con este id');
    res.redirect('/courses');
  }
};

/**
* enter course
*
*/
exports.enterCourse = (req, res) => {
  allCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('enter-course', { course: show });
};

/**
* registry course
*
*/
exports.registryCourse = (req, res) => {
  coursesPerPerson();
  people();

  const registryUser = {
    identity: req.body.identity,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const coursesPerson = {
    user_id: req.body.identity,
    course_id: req.body.course_id,
  };

  const checkExistPerson = registeredPeople
    .find(search => search.identity === registryUser.identity);

  const checkDuplicate = coursePerson
    .filter(search => search.user_id === registryUser.identity
      && search.course_id === coursesPerson.course_id);

  if ((checkDuplicate.length >= 1 || checkDuplicate.length >= 1) && checkExistPerson) {
    console.log('ya estas inscrito en este curso');
    res.redirect('/courses-available');
  } else if (checkDuplicate.length == 0 && !checkExistPerson) {
    registeredPeople.push(registryUser);
    coursePerson.push(coursesPerson);
    savePerson();
    saveCoursesPerPerson();
    res.redirect('/courses-available');
  } else if (checkDuplicate.length == 0 && checkExistPerson) {
    const newData = registeredPeople.filter(search => search.identity != registryUser.identity);
    newData.push(registryUser);
    coursePerson.push(coursesPerson);
    registeredPeople = newData;
    savePerson();
    saveCoursesPerPerson();
    res.redirect('/courses-available');
  }
};

/**
* show only available courses
*
*/
exports.coursesAvailable = function (req, res) {
  allCourses();
  const onlyAvailable = coursesList.filter(available => available.state == 'disponible');
  res.render('courses-available', { courses: onlyAvailable });
};

/**
* seeRegistered
*
*/
exports.seeRegistered = function (req, res) {
  allCourses();
  people();
  coursesPerPerson();

  registeredCourse = [];

  const show = coursesList.find(search => search.id == req.params.id);
  const insideCourse = coursePerson.filter(search => search.course_id == req.params.id);

  insideCourse.forEach(person => {
    const createPerson = registeredPeople.find(search => search.identity == person.user_id);
    createPerson.course_id = req.params.id;
    registeredCourse.push(createPerson);
  });

  res.render('see-registered', { course: show, people: registeredCourse, checkAdmin: functions.isAdmin(req) });
};

/**
* update course status
*
*/
exports.updateCourseStatus = function (req, res) {
  allCourses();

  const found = coursesList.find(search => search.id == req.params.id);
  found['state'] = 'cerrado';
  saveCourse();
  res.redirect('/courses');
};

/**
* remove from course
*
*/
exports.removeFromCourse = function (req, res) {
  coursesPerPerson();

  const newData = coursePerson.filter(search => !(search.course_id == req.params.course_id && search.user_id == req.params.student_id));
  coursePerson = newData;

  saveCoursesPerPerson();
  res.redirect('/courses');
};
