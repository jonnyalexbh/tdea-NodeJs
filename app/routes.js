const express = require('express');

const courseController = require('./controllers/course');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const authenticationMiddleware = require('./middlewares/authentication');

const router = express.Router();

router.get('/', loginController.index)
  .post('/login', loginController.authenticated)
  .get('/register', registerController.create)
  .post('/register-store', registerController.store)
  .use(authenticationMiddleware)
  .get('/logout', loginController.logout)
  .get('/main', loginController.main)
  .get('/create-course', courseController.create)
  .get('/courses', courseController.index)
  .get('/show-course/:id', courseController.show)
  .post('/store-course', courseController.store)
  .post('/registry-course', courseController.registryCourse)
  .get('/courses-available', courseController.coursesAvailable)
  .get('/see-registered/:id', courseController.seeRegistered)
  .get('/update-course-status/:id', courseController.updateCourseStatus)
  .get('/remove-from-course/:courseId/:userId', courseController.removeFromCourse)
  .get('/my-courses', courseController.myCourses)
  .get('/remove-my-courses/:courseId', courseController.removeMyCourses);

module.exports = router;
