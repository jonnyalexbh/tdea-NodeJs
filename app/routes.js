const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const courseController = require('./controllers/course');
const loginController = require('./controllers/login');
const userController = require('./controllers/user');
const registerController = require('./controllers/register');
const authenticationMiddleware = require('./middlewares/authentication');

const router = express.Router();

const uploadProfilePictureHelper = multer({
  fileFilter: (req, file, callback) => callback(null, path.extname(file.originalname) === '.jpg'),
  limits: {
    fileSize: 1 * 1024 * 1024,
    files: 1,
  },
  storage: multer.diskStorage({
    destination: function dest(req, file, callback) {
      const filesDestination = path.join(__dirname, '../public/files');
      if (!fs.existsSync(filesDestination)) fs.mkdirSync(filesDestination, { recursive: true });
      callback(null, filesDestination);
    },
    filename: (req, file, callback) => callback(null, `${req.body.identity}${path.extname(file.originalname)}`),
  }),
});

router.get('/', loginController.index)
  .post('/login', loginController.authenticated)
  .get('/register', registerController.create)
  .post('/register-store', uploadProfilePictureHelper.single('picture'), registerController.store)
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
  .post('/update-course-status', courseController.updateCourseStatus)
  .post('/remove-from-course', courseController.removeFromCourse)
  .get('/my-courses', courseController.myCourses)
  .post('/remove-my-courses', courseController.removeMyCourses)
  .get('/users', userController.list)
  .get('/edit-user/:userId', userController.editUser)
  .post('/update-user', userController.updateUser)
  .get('/teacher-courses', courseController.teacherCourses)
  .get('/see-teachers/:courseId', userController.teachers)
  .post('/assign-teacher', courseController.assignTeacher);

module.exports = router;
