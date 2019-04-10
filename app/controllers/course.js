const Service = require('../service');

const index = (req, res, next) => {
  Service.loadCourses()
    .then(courses => res.render('courses', { courses, req }))
    .catch(error => next(error));
};

const create = (req, res) => res.render('create-course', { req });

const store = (req, res) => {
  Service.createCourse(req.body)
    .then(() => {
      res.render('courses', { courses: Service.loadCourses(), req, success: 'Curso registrado correctamente' });
    })
    .catch((error) => {
      console.error('Error', error);
      res.render('create-course', { req, info: 'Ya existe otro curso con este id' });
    });
};

const show = (req, res, next) => {
  Service.courseById(req.params.id)
    .then((course) => {
      res.render('show-course', { course, req });
    })
    .catch(error => next(error));
};

const registryCourse = (req, res) => {
  Service.registerCourse(req.body)
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

const coursesAvailable = (req, res, next) => {
  Service.getCoursesAvailable()
    .then(courses => res.render('courses', { courses, req }))
    .catch(error => next(error));
};

const seeRegistered = (req, res, next) => {
  Service.readUsersInCourse({ courseId: req.params.id })
    .then((data) => {
      res.render('see-registered', { ...data, req });
    })
    .catch(error => next(error));
};

const updateCourseStatus = (req, res, next) => {
  Service.closeCourse()
    .then((courses) => {
      res.render('courses', { courses, req });
    })
    .catch(error => next(error));
};

const removeFromCourse = (req, res, next) => {
  const { courseId, userId } = req.params;
  Service.unsubscribeStudent({ courseId, userId })
    .then((courses) => {
      res.render('courses', { courses, req });
    })
    .catch(error => next(error));
};

const myCourses = (req, res, next) => {
  Service.readMyCourses(req.session.userId)
    .then(courses => res.render('my-courses', { courses, req }))
    .catch(error => next(error));
};

const removeMyCourses = (req, res, next) => {
  const { courseId, userId } = req.params;
  Service.removeCourseById({ courseId, userId })
    .then(courses => res.render('my-courses', { courses, req }))
    .catch(error => next(error));
};

module.exports = {
  index,
  create,
  store,
  show,
  registryCourse,
  coursesAvailable,
  seeRegistered,
  updateCourseStatus,
  removeFromCourse,
  myCourses,
  removeMyCourses,
};
