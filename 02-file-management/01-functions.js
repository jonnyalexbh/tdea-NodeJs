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
  studentList.push(stud)
  console.log(studentList);
  saveStudents()
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

module.exports = {
  create
}