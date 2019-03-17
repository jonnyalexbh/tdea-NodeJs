const { courses } = require('./delivery1-courses');
const fs = require('fs');

const options = {
  course_id: {
    demand: true,
    alias: 'c'
  },
  identification: {
    demand: true,
    alias: 'i'
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
      console.log(`${value.id} Curso de ${value.name} duración ${value.duration} costo ${value.value}`);
    }, 2000 * key);
  })
}

/*
 * create file
 * 
 */
let createFile = (course, argv) => {
  testText = `El estudiante ${argv.name} con identificacion ${argv.i} quedo inscrito al curso ${course.id} - ${course.name} con una duracion de ${course.duration} y un costo ${course.value}`;
  fs.writeFile('inscripcion-ok.txt', testText, (err) => {
    if (err) throw (err)
    console.log('the file has been created');
  })
}

/*
 * exist course
 * 
 */
let existCourse = (course, argv) => {
  if (course == undefined) console.log('El ID del curso ingresado no existe');
  else {
    console.log(`${course.id} Curso de ${course.name} duración ${course.duration} costo ${course.value}`);
    createFile(course, argv)
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
  let course = courses.find(course => course.id == argv.c)
  existCourse(course, argv)
}
else {
  console.log('Educación Continua del Tecnológico de Antioquia');
  listCourses();
}
