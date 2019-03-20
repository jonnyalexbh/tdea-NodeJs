const fs = require('fs');

studentList = []

const create = (student) => {
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
