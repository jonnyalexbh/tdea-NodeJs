const functions = require('../functions');

let coursesList = [];
let registeredUsers = [];
let coursePerson = [];

/**
* all courses
*
*/
exports.index = (req, res) => {
  functions.isLogged(req, res);
  coursesList = functions.loadCourses();
  res.render('courses', { courses: coursesList, req });
};

/**
* add course
*
*/
exports.addCourse = (req, res) => {
  res.render('add-course', { req });
};

/**
* show course
*
*/
exports.show = (req, res) => {
  coursesList = functions.loadCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('show-course', { course: show, req });
};

/**
* store a course
*
*/
exports.store = (req, res) => {
  coursesList = functions.loadCourses();

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
    functions.storeCourses(coursesList);
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
  coursesList = functions.loadCourses();
  const show = coursesList.find(search => search.id === req.params.id);
  res.render('enter-course', { course: show, req });
};

/**
* registry course
*
*/
exports.registryCourse = (req, res) => {
  coursePerson = functions.loadCoursesPerPerson();
  registeredUsers = functions.loadUsers();

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

  const checkExistPerson = registeredUsers
    .find(search => search.identity === registryUser.identity);

  const checkDuplicate = coursePerson
    .filter(search => search.user_id === registryUser.identity
      && search.course_id === coursesPerson.course_id);

  if ((checkDuplicate.length >= 1 || checkDuplicate.length >= 1) && checkExistPerson) {
    console.log('ya estas inscrito en este curso');
    res.redirect('/courses-available');
  } else if (checkDuplicate.length === 0 && !checkExistPerson) {
    registeredUsers.push(registryUser);
    coursePerson.push(coursesPerson);
    functions.storeUsers(registeredUsers);
    functions.storeCoursesPerPerson(coursePerson);
    res.redirect('/courses-available');
  } else if (checkDuplicate.length === 0 && checkExistPerson) {
    const newData = registeredUsers.filter(search => search.identity !== registryUser.identity);
    newData.push(registryUser);
    coursePerson.push(coursesPerson);
    registeredUsers = newData;
    functions.storeUsers(registeredUsers);
    functions.storeCoursesPerPerson(coursePerson);
    res.redirect('/courses-available');
  }
};

/**
* show only available courses
*
*/
exports.coursesAvailable = (req, res) => {
  functions.isLogged(req, res);
  coursesList = functions.loadCourses();
  const onlyAvailable = coursesList.filter(available => available.state === 'disponible');
  res.render('courses-available', { courses: onlyAvailable, req });
};

/**
* seeRegistered
*
*/
exports.seeRegistered = (req, res) => {
  coursesList = functions.loadCourses();
  registeredUsers = functions.loadUsers();
  coursePerson = functions.loadCoursesPerPerson();

  const registeredCourse = [];

  const show = coursesList.find(search => search.id === req.params.id);
  const insideCourse = coursePerson.filter(search => search.course_id === req.params.id);

  insideCourse.forEach((person) => {
    const createPerson = registeredUsers.find(search => search.identity === person.user_id);
    createPerson.course_id = req.params.id;
    registeredCourse.push(createPerson);
  });

  res.render('see-registered', { course: show, people: registeredCourse, req });
};

/**
* update course status
*
*/
exports.updateCourseStatus = (req, res) => {
  coursesList = functions.loadCourses();

  const found = coursesList.find(search => search.id === req.params.id);
  found.state = 'cerrado';
  functions.storeCourses(coursesList);
  res.render('courses', { courses: coursesList, req });
};

/**
* remove from course
*
*/
exports.removeFromCourse = (req, res) => {
  coursePerson = functions.loadCoursesPerPerson();

  const code = coursePerson.findIndex(search => search.course_id === req.params.course_id
    && search.user_id === req.params.student_id);
  coursePerson.splice(code, 1);

  functions.storeCoursesPerPerson(coursePerson);
  res.render('courses', { courses: coursesList, req });
};

/**
* my courses
*
*/
exports.myCourses = (req, res) => {
  functions.isLogged(req, res);
  coursesList = functions.loadCourses();
  coursePerson = functions.loadCoursesPerPerson();
  const insideCourse = coursePerson.filter(search => search.user_id === req.session.userId);

  const courses = [];

  insideCourse.forEach((item) => {
    const course = coursesList.find(search => search.id === item.course_id);
    courses.push(course);
  });

  res.render('my-courses', { courses, req });
};
