const fs = require('fs');
coursesList = [];

/**
* returns all courses
*
*/
const all = () => {
  try {
    return require('../../courses.json')
  }
  catch (error) {
    return []
  }
}

/**
* show all courses
*
*/
exports.index = function (req, res) {
  res.render('courses', { courses: all() });
};

/**
* show course
*
*/
exports.show = function (req, res) {
  coursesList = all()
  let show = coursesList.find(search => search.id == req.params.id)
  res.render('show-course', { course: show });
};

/**
* store a course
*
*/
exports.store = function (req, res) {
  coursesList = all()

  let course = {
    id: req.body.id,
    name: req.body.name,
    modality: req.body.modality,
    workload: req.body.workload,
    description: req.body.description,
    state: 'Disponible',
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
};

/**
* show only available courses
*
*/
exports.coursesAvailable = function (req, res) {
  coursesList = all()
  let onlyAvailable = coursesList.filter(available => available.state == 'Disponible')
  res.render('courses-available', { courses: onlyAvailable });
};
