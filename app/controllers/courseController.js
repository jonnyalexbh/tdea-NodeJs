const functions = require('../service');

let coursesList = [];
let registeredUsers = [];
let coursePerson = [];

/**
* all courses
*
*/
exports.index = (req, res, next) => {
  functions.isLogged(req, res);
  functions.loadCourses()
    .then(courses => res.render('courses', { courses, req }))
    .catch(error => next(error));
};

exports.create = (req, res) => res.render('create-course', { req });

/**
* store a course
*
*/
exports.store = (req, res) => {
  functions.createCourse(req.body)
    .then(() => {
      res.render('courses', { courses: functions.loadCourses(), req, success: 'Curso registrado correctamente' });
    })
    .catch((error) => {
      console.error('Error', error);
      res.render('create-course', { req, info: 'Ya existe otro curso con este id' });
    });
};

exports.show = (req, res, next) => {
  functions.courseById(req.params.id)
    .then((course) => {
      res.render('show-course', { course, req });
    })
    .catch(error => next(error));
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

exports.registryCourse = (req, res) => {
  functions.registerCourse(req.body)
    .then(({ state, courses }) => {
      switch (state) {
        case 0:
          res.render('courses-available', { courses, req, info: 'Ya estas inscrito en este curso' });
          break;

        default:
          res.render('courses-available', { courses, req, success: 'Curso registrado correctamente' });
          break;
      }
    })
    .catch((error) => {
      res.render('courses-available', { courses: [], req, success: error.message });
    });
};

/**
* show only available courses
*
*/
exports.coursesAvailable = (req, res, next) => {
  functions.getCoursesAvailable()
    .then(courses => res.render('courses', { courses, req }))
    .catch(error => next(error));
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


/**
* remove my courses
*
*/
exports.removeMyCourses = (req, res) => {
  coursePerson = functions.loadCoursesPerPerson();

  const code = coursePerson.findIndex(search => search.course_id === req.params.course_id
    && search.user_id === req.session.userId);
  coursePerson.splice(code, 1);

  functions.storeCoursesPerPerson(coursePerson);
  res.render('my-courses', { courses: coursePerson, req });
};
