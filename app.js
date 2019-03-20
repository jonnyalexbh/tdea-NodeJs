const express = require('express');
const app = express();

const { courses } = require('./courses');
let textToPrint = ''

const options = {
  course_id: {
    demand: true,
    alias: 'i'
  },
  identification: {
    demand: true,
    alias: 'x'
  },
  name: {
    demand: true,
    alias: 'n'
  }
}

/*
 * list courses
 * 
 */
let listCourses = () => {
  Object.keys(courses).forEach(key => {
    let value = courses[key]
    setTimeout(() => {
      console.log(`El curso se llama ${value.id}-${value.name} tiene una duración ${value.duration} y un valor de ${value.value}`);
    }, 2000 * key);
  })
}

/*
 * print in the browser
 * 
 */
let printBrowser = (course, argv) => {
  textToPrint = `El estudiante ${argv.name} con cédula ${argv.identification} se ha matriculado en el curso ${course.id} - ${course.name} tiene una duración de ${course.duration} y un valor ${course.value}`
}

/*
 * exist course
 * 
 */
let existCourse = (course, argv) => {
  if (course == undefined) {
    console.log('Ha ingresado un ID que no corresponde a ningún curso');
    listCourses();
  }
  else {
    printBrowser(course, argv)
  }
}

/*
 * argv yargs
 * 
 */
const argv = require('yargs')
  .command('inscripcion', 'registrarse en educacion continua', options)
  .argv

if (argv._[0] == 'inscripcion') {
  let course = courses.find(course => course.id == argv.course_id)
  existCourse(course, argv)
}
else {
  console.log('Educación Continua del Tecnológico de Antioquia');
  listCourses();
}

app.get('/', function (req, res) {
  res.send(textToPrint)
})

const server = app.listen(8000, function () {
  console.log(`listening http://localhost:${server.address().port}`);
});
