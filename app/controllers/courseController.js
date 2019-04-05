const fs = require('fs');

/**
* returns all courses
*
*/
const allCourses = () => {
  try {
    return require('../../data/courses.json');
  } catch (error) {
    return [];
  }
};

/**
* people
*
*/
const people = () => {
  try {
    return require('../../data/registered.json');
  } catch (error) {
    return [];
  }
};

/**
* returns coursesPerPerson
*
*/
const coursesPerPerson = () => {
  try {
    return require('../../data/courses-per-person.json');
  } catch (error) {
    return [];
  }
};

/**
* returns courses available
*
*/
const getCoursesAvailable = () => {
  const coursesList = allCourses();
  return coursesList.filter(available => available.state === 'disponible');
};

/**
* saveCourse
*
*/
const saveCourse = (courses) => {
  const data = JSON.stringify(courses);
  fs.writeFile('data/courses.json', data, (err) => {
    if (err) throw (err);
    console.log('Curso guardado correctamente');
  });
};

/**
* savePerson
*
*/
const savePerson = (persons) => {
  const data = JSON.stringify(persons);
  fs.writeFile('data/registered.json', data, (err) => {
    if (err) throw (err);
    console.log('Aspirante registrado correctamente');
  });
};

/**
* saveCoursesPerPerson
*
*/
const saveCoursesPerPerson = (info) => {
  const data = JSON.stringify(info);
  fs.writeFile('data/courses-per-person.json', data, (err) => {
    if (err) throw (err);
    console.log('curso registrado para el estudiante');
  });
};

/**
* show all courses
*
*/
exports.index = (req, res) => {
  const coursesList = allCourses();
  res.render('courses', { courses: coursesList });
};

/**
* show course
*
*/
exports.show = (req, res) => {
  const coursesList = allCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('show-course', { course: show });
};

/**
* store a course
*
*/
exports.store = (req, res) => {
  const coursesList = allCourses();

  const course = {
    id: req.body.id,
    name: req.body.name,
    modality: req.body.modality,
    workload: req.body.workload,
    description: req.body.description,
    state: 'disponible',
    cost: req.body.cost,
  };

  const duplicate = coursesList.find(search => search.id === course.id);

  if (!duplicate) {
    coursesList.push(course);
    saveCourse(coursesList);
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
  const coursesList = allCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('enter-course', { course: show });
};

/**
* registry course
*
*/
exports.registryCourse = (req, res) => {
  const coursePerson = coursesPerPerson();
  let registeredPeople = people();

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

  const checkExistPerson = registeredPeople.find(search => search.identity
    === registryUser.identity);
  const checkDuplicate = coursePerson.filter(search => search.user_id === registryUser.identity
    && search.course_id === coursesPerson.course_id);

  if ((checkDuplicate.length >= 1) && checkExistPerson) {
    res.render('courses-available', { courses: getCoursesAvailable(), info: 'ya estas inscrito en este curso' });
  } else if (checkDuplicate.length === 0 && !checkExistPerson) {
    registeredPeople.push(registryUser);
    coursePerson.push(coursesPerson);
    savePerson(registeredPeople);
    saveCoursesPerPerson(coursePerson);
    res.render('courses-available', { courses: getCoursesAvailable(), success: 'curso registrado correctamente' });
  } else if (checkDuplicate.length === 0 && checkExistPerson) {
    const newData = registeredPeople.filter(search => search.identity !== registryUser.identity);
    newData.push(registryUser);
    coursePerson.push(coursesPerson);
    registeredPeople = newData;
    savePerson(registeredPeople);
    saveCoursesPerPerson(coursePerson);
    res.render('courses-available', { courses: getCoursesAvailable(), success: 'curso registrado correctamente' });
  }
};

/**
* show only available courses
*
*/
exports.coursesAvailable = (req, res) => {
  res.render('courses-available', { courses: getCoursesAvailable() });
};

/**
* seeRegistered
*
*/
exports.seeRegistered = (req, res) => {
  const coursesList = allCourses();
  const registeredPeople = people();
  const coursePerson = coursesPerPerson();

  const registeredCourse = [];

  const show = coursesList.find(search => search.id === req.params.id);
  const insideCourse = coursePerson.filter(search => search.course_id === req.params.id);

  insideCourse.forEach((person) => {
    const createPerson = registeredPeople.find(search => search.identity === person.user_id);
    createPerson.course_id = req.params.id;
    registeredCourse.push(createPerson);
  });

  res.render('see-registered', { course: show, people: registeredCourse });
};

/**
* update course status
*
*/
exports.updateCourseStatus = (req, res) => {
  const coursesList = allCourses();

  const found = coursesList.find(search => search.id === req.params.id);
  found.state = 'cerrado';
  saveCourse(coursesList);
  res.redirect('/courses');
};

/**
* remove from course
*
*/
exports.removeFromCourse = (req, res) => {
  let coursePerson = coursesPerPerson();

  const newData = coursePerson.filter(search => !(
    search.course_id === req.params.course_id && search.user_id === req.params.student_id));
  coursePerson = newData;

  saveCoursesPerPerson(coursePerson);
  res.redirect('/courses');
};
