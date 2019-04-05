const express = require('express');

const router = express.Router();
const courseController = require('./controllers/courseController');

router.get('/courses', courseController.index);
router.get('/create-course', courseController.create);
router.get('/show-course/:id', courseController.show);
router.post('/store-course', courseController.store);
router.get('/enter-course/:id', courseController.enterCourse);
router.post('/registry-course', courseController.registryCourse);
router.get('/courses-available', courseController.coursesAvailable);
router.get('/see-registered/:id', courseController.seeRegistered);
router.get('/update-course-status/:id', courseController.updateCourseStatus);
router.get('/remove-from-course/:course_id/:student_id', courseController.removeFromCourse);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
