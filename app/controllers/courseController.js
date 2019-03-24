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
* store a course
*
*/
exports.store = function (req, res) {
  coursesList = all()

  console.log(req.body.state);
  

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
