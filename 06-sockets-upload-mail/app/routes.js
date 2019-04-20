const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({})

const router = express.Router();
const loginController = require('./controllers/loginController');
const courseController = require('./controllers/courseController');
const studentController = require('./controllers/studentController');

router.get('/', loginController.index);
router.post('/login', loginController.authenticated);
router.get('/main', loginController.main);

router.get('/courses', courseController.index);
router.get('/show-course/:id', courseController.show);
router.post('/store-course', courseController.store);
router.get('/enter-course/:id', courseController.enterCourse);
router.post('/registry-course', courseController.registryCourse);
router.get('/courses-available', courseController.coursesAvailable);
router.get('/see-registered/:id', courseController.seeRegistered);
router.get('/update-course-status/:id', courseController.updateCourseStatus);
router.get('/remove-from-course/:course_id/:student_id', courseController.removeFromCourse);

router.get('/notes', studentController.index);
router.get('/create-notes', studentController.create);
router.post('/store-notes', upload.single('photo'), studentController.store);
router.get('/edit-notes/:id', studentController.edit);
router.post('/update-notes', studentController.update);
router.get('/remove-notes/:id', studentController.destroy);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-course', (req, res) => {
  res.render('add-course');
});

module.exports = router;
