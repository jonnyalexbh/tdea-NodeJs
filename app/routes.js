const express = require('express');

const router = express.Router();
const courseController = require('./controllers/courseController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

router.get('/', loginController.index);
router.get('/logout', loginController.logout);
router.post('/login', loginController.authenticated);
router.get('/main', loginController.main);
router.get('/register', registerController.create);
router.post('/register-store', registerController.store);

router.get('/add-course', courseController.addCourse);
router.get('/courses', courseController.index);
router.get('/show-course/:id', courseController.show);
router.post('/store-course', courseController.store);
router.get('/enter-course/:id', courseController.enterCourse);
router.post('/registry-course', courseController.registryCourse);
router.get('/courses-available', courseController.coursesAvailable);
router.get('/see-registered/:id', courseController.seeRegistered);
router.get('/update-course-status/:id', courseController.updateCourseStatus);
router.get('/remove-from-course/:course_id/:student_id', courseController.removeFromCourse);
router.get('/my-courses', courseController.myCourses);

module.exports = router;
