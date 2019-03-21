const fs = require('fs');

studentList = []

const create = (student) => {
  toList()
  let stud = {
    name: student.name,
    math: student.math,
    english: student.english,
    programation: student.programation
  }

  let duplicate = studentList.find(nam => nam.name == student.name)

  if (!duplicate) {
    studentList.push(stud)
    console.log(studentList);
    saveStudents()
  }
  else {
    console.log('Ya existe otro estudiante con ese nombre');
  }

}

const toList = () => {
  try {
    studentList = require('./list.json')
  }
  catch (error) {
    studentList = []
  }

  // en caso de que se vaya a trabajar de manera asincrónica utilizar esta segunda
  // studentList = JSON.parse(fs.readFileSync('list.json'))
}

const saveStudents = () => {
  let data = JSON.stringify(studentList)
  fs.writeFile('list.json', data, (err) => {
    if (err) throw (err)
    console.log('Archivo creado con éxito')
  })
}

const show = () => {
  toList()
  console.log('Notas de los estudiantes')

  studentList.forEach(student => {
    console.log(student.name);
    console.log('notas');
    console.log('matematicas ' + student.math);
    console.log('ingles ' + student.english);
    console.log('programacion ' + student.programation + '\n');
  });

}

module.exports = {
  create,
  show
}
