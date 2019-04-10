const express = require('express');

const courseController = require('./controllers/course');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');

const router = express.Router();

router.get('/', loginController.index);
router.get('/logout', loginController.logout);
router.post('/login', loginController.authenticated);
router.get('/main', loginController.main);
router.get('/register', registerController.create);
router.post('/register-store', registerController.store);

// Course's endpoints;
router.get('/create-course', courseController.create);
router.get('/courses', courseController.index);
router.get('/show-course/:id', courseController.show);
router.post('/store-course', courseController.store);
router.post('/registry-course', courseController.registryCourse);
router.get('/courses-available', courseController.coursesAvailable);
router.get('/see-registered/:id', courseController.seeRegistered);
router.get('/update-course-status/:id', courseController.updateCourseStatus);
router.get('/remove-from-course/:courseId/:userId', courseController.removeFromCourse);
router.get('/my-courses', courseController.myCourses);
router.get('/remove-my-courses/:courseId', courseController.removeMyCourses);

module.exports = router;
