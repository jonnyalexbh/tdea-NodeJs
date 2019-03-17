const { courses } = require('./delivery1-courses');
const fs = require('fs');

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
 * create file
 * 
 */
let createFile = (course, argv) => {
  testText = `El estudiante ${argv.name} con cédula ${argv.identification} se ha matriculado en el curso ${course.id} - ${course.name} tiene una duración de ${course.duration} y un valor ${course.value}`;
  fs.writeFile('inscripcion-ok.txt', testText, (err) => {
    if (err) throw (err)
    console.log('se ha creado el archivo');
  })
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
  let course = courses.find(course => course.id == argv.course_id)
  existCourse(course, argv)
}
else {
  console.log('Educación Continua del Tecnológico de Antioquia');
  listCourses();
}
