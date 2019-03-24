const express = require('express');
const router = express.Router();
const course_controller = require('./controllers/courseController');

router.get('/courses', course_controller.index);
router.get('/show-course/:id', course_controller.show);
router.post('/store-course', course_controller.store);
router.get('/courses-available', course_controller.coursesAvailable);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-course', (req, res) => {
  res.render('add-course');
});

module.exports = router;
