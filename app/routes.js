const express = require('express');
const router = express.Router();
const course_controller = require('./controllers/courseController');

router.get('/courses', course_controller.index);
router.post('/store-course', course_controller.store);

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/add-course', (req, res) => {
  res.render('add-course');
});

module.exports = router;
