const express = require('express');

const router = express.Router();
const courseController = require('./controllers/courseController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

router.get('/', loginController.index);
router.post('/login', loginController.authenticated);
router.get('/register', registerController.create);
router.post('/register-store', registerController.store);

router.get('/courses', courseController.index);
router.get('/show-course/:id', courseController.show);
router.post('/store-course', courseController.store);
router.get('/enter-course/:id', courseController.enterCourse);
router.post('/registry-course', courseController.registryCourse);
router.get('/courses-available', courseController.coursesAvailable);
router.get('/see-registered/:id', courseController.seeRegistered);
router.get('/update-course-status/:id', courseController.updateCourseStatus);
router.get('/remove-from-course/:course_id/:student_id', courseController.removeFromCourse);

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/add-course', (req, res) => {
  res.render('add-course');
});

module.exports = router;
