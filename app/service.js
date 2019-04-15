/* eslint-disable no-await-in-loop */

const bcrypt = require('bcrypt');
const Course = require('./models/course');
const CourseByUser = require('./models/coursexuser');
const User = require('./models/user');

const loadCourses = async () => {
  const courses = await Course.find({});

  for (let i = 0; i < courses.length; i += 1) {
    const { teacherId } = courses[i];
    if (teacherId) {
      courses[i].teacher = (await User.findOne({ identity: teacherId })).name;
    } else {
      courses[i].teacher = '- - -';
    }
  }
  return courses;
};

const getCoursesAvailable = async () => Course.find({ state: 'disponible' });

const isAdmin = (req) => {
  if (req.session.userRole === 'admin') {
    return 1;
  }
  return 0;
};

const createCourse = async (data) => {
  const course = await Course.findOne({ id: data.id });
  if (course) throw new Error('Course already exists');
  const newCourse = new Course(data);
  await newCourse.save();
};

const logIn = async ({ user, pass }) => {
  const model = await User.findOne({ identity: user });
  if (!model) throw new Error('User not found');
  const isSamePasswd = await bcrypt.compare(pass, model.password);
  if (!isSamePasswd) throw new Error('Password is incorrect');
  return model;
};

const registerUser = async (data) => {
  const existsUser = await User.findOne({ identity: data.identity });
  if (existsUser) throw new Error('La información ya existe en nuestro sistema');
  const encryptedPassword = await bcrypt.hash(data.identity, 10);

  const user = new User({ ...data, password: encryptedPassword });
  await user.save();
};

const courseById = async courseId => Course.findOne({ id: courseId });

const registerCourse = async ({ courseId, userId }) => {
  const response = {
    state: -1,
    courses: await getCoursesAvailable(),
  };

  const coursesPerson = { userId, courseId };

  const user = await User.findOne({ identity: userId });
  const userInCourse = await CourseByUser
    .findOne({ userId: coursesPerson.userId, courseId: coursesPerson.courseId });

  if (user && userInCourse) {
    response.state = 0;
    return response;
  }

  const newCourseByUser = new CourseByUser(coursesPerson);
  await newCourseByUser.save();
  response.data = coursesPerson;
  response.state = 1;
  return response;
};

const readUsersInCourse = async ({ courseId }) => {
  const course = await Course.findOne({ id: courseId });
  const userIds = await CourseByUser.distinct('userId', { courseId });
  const people = await User.find({ identity: { $in: userIds } });

  return {
    course,
    people,
  };
};

const closeCourse = async (data) => {
  await Course.findOneAndUpdate({ id: data.id }, { $set: { state: 'cerrado' } });
  const courses = await loadCourses();
  return courses;
};

const unsubscribeStudent = async ({ courseId, userId }) => {
  await CourseByUser.deleteMany({ courseId, userId });
  const courses = await loadCourses();
  return courses;
};

const readMyCourses = async (userId) => {
  const courseIds = await CourseByUser.distinct('courseId', { userId });
  const courses = await Course.find({ id: { $in: courseIds } });
  return courses;
};

const removeCourseById = async ({ courseId, userId }) => {
  await CourseByUser.deleteMany({ courseId, userId });
  const myCourses = await readMyCourses(userId);
  return myCourses;
};

const listUsers = async () => User.find({});

const findUser = async userId => User.findById(userId).lean();

const updateUser = async (data) => {
  const newData = Object.assign({}, data);
  delete newData.id;
  const result = await User.findByIdAndUpdate({ _id: data.id }, { $set: data });

  if (!result) {
    throw new Error('El usuario no existe');
  }

  return result;
};

const loadTeacherCourses = async (teacherId) => {
  const courses = await Course.find({ teacherId });
  return courses;
};

const listTeachers = async () => User.find({ role: 'docente' });

const assignTeacher = async ({ courseId, teacherId }) => Course
  .findOneAndUpdate({ id: courseId }, { $set: { teacherId } });

module.exports = {
  assignTeacher,
  closeCourse,
  courseById,
  createCourse,
  findUser,
  getCoursesAvailable,
  isAdmin,
  listTeachers,
  listUsers,
  loadCourses,
  loadTeacherCourses,
  logIn,
  readMyCourses,
  readUsersInCourse,
  registerCourse,
  registerUser,
  removeCourseById,
  unsubscribeStudent,
  updateUser,
};
