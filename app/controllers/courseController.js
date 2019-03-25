const fs = require('fs');

coursesList = [];
registeredPeople = [];
coursePerson = [];

/**
* returns all courses
*
*/
const allCourses = () => {
  try {
    coursesList = require('../../courses.json')
  }
  catch (error) {
    return []
  }
}

/**
* people
*
*/
const people = () => {
  try {
    registeredPeople = require('../../registered.json')
  }
  catch (error) {
    return []
  }
}

/**
* returns coursesPerPerson
*
*/
const coursesPerPerson = () => {
  try {
    coursePerson = require('../../courses-per-person.json')
  }
  catch (error) {
    return []
  }
}

/**
* savePerson
*
*/
const savePerson = () => {
  let data = JSON.stringify(registeredPeople)
  fs.writeFile('registered.json', data, (err) => {
    if (err) throw (err)
    console.log('Aspirante registrado correctamente')
  })
}

/**
* saveCoursesPerPerson
*
*/
const saveCoursesPerPerson = () => {
  let data = JSON.stringify(coursePerson)
  fs.writeFile('courses-per-person.json', data, (err) => {
    if (err) throw (err)
    console.log('curso registrado para el estudiante')
  })
}

/**
* show all courses
*
*/
exports.index = function (req, res) {
  allCourses()
  res.render('courses', { courses: coursesList });
}

/**
* show course
*
*/
exports.show = function (req, res) {
  allCourses()
  let show = coursesList.find(search => search.id == req.params.id)
  res.render('show-course', { course: show });
}

/**
* store a course
*
*/
exports.store = function (req, res) {
  allCourses()

  let course = {
    id: req.body.id,
    name: req.body.name,
    modality: req.body.modality,
    workload: req.body.workload,
    description: req.body.description,
    state: 'disponible',
    cost: req.body.cost
  }

  let duplicate = coursesList.find(search => search.id == course.id)

  if (!duplicate) {
    coursesList.push(course)
    let data = JSON.stringify(coursesList)

    fs.writeFile('courses.json', data, (err) => {
      if (err) throw (err)
      res.redirect('/courses');
    })
  }
  else {
    console.log('Ya existe otro curso con este id');
    res.redirect('/courses');
  }
}

/**
* enter course
*
*/
exports.enterCourse = function (req, res) {
  allCourses()
  let show = coursesList.find(search => search.id == req.params.id)
  res.render('enter-course', { course: show });
}

/**
* registry course
*
*/
exports.registryCourse = function (req, res) {
  coursesPerPerson()
  people()

  let registryUser = {
    identity: req.body.identity,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }

  let coursesPerson = {
    user_id: req.body.identity,
    course_id: req.body.course_id
  }

  let checkExistPerson = registeredPeople.find(search => search.identity == registryUser.identity)
  let checkDuplicate = coursePerson.filter(search => search.user_id == registryUser.identity && search.course_id == coursesPerson.course_id)

  registeredPeople.push(registryUser)
  coursePerson.push(coursesPerson)

  if (checkDuplicate.length >= 1 || checkDuplicate.length >= 1 && checkExistPerson) {
    console.log('ya estas inscrito en este curso');
    res.redirect('/courses-available');
  }
  else if (checkDuplicate.length == 0 && !checkExistPerson) {
    savePerson()
    saveCoursesPerPerson()
    res.redirect('/courses-available');
  }
  else if (checkDuplicate.length == 0 && checkExistPerson) {
    let newData = registeredPeople.filter(search => search.identity != registryUser.identity)
    newData.push(registryUser)
    registeredPeople = newData
    savePerson()
    saveCoursesPerPerson()
    res.redirect('/courses-available');
  }
}

/**
* show only available courses
*
*/
exports.coursesAvailable = function (req, res) {
  allCourses()
  let onlyAvailable = coursesList.filter(available => available.state == 'disponible')
  res.render('courses-available', { courses: onlyAvailable });
}

/**
* seeRegistered
*
*/
exports.seeRegistered = function (req, res) {
  allCourses()
  people()
  coursesPerPerson()

  registeredCourse = [];

  let show = coursesList.find(search => search.id == req.params.id)
  let insideCourse = coursePerson.filter(search => search.course_id == req.params.id)

  insideCourse.forEach(person => {
    let formar = registeredPeople.find(search => search.identity == person.user_id)
    registeredCourse.push(formar);
  });

  res.render('see-registered', { course: show, people: registeredCourse });
}
