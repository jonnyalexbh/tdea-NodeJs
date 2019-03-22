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

const showStudent = (nam) => {
  toList()
  let stu = studentList.find(searchFor => searchFor.name == nam)

  if (!stu) {
    console.log('No existe el estudiante');
  }
  else {
    console.log(stu.name);
    console.log('notas');
    console.log('matematicas ' + stu.math);
    console.log('ingles ' + stu.english);
    console.log('programacion ' + stu.programation + '\n');
  }
}

const showMath = () => {
  toList()
  let win = studentList.filter(mat => mat.math >= 3)

  if (win.length == 0) {
    console.log('ningun estudiante va ganando');
  }
  else {
    win.forEach(student => {
      console.log(student.name);
      console.log('notas');
      console.log('matematicas ' + student.math + '\n');
    });
  }
}

/*
 * average of a student
 * 
 */
const showAverage = (nam) => {
  toList()
  let stu = studentList.find(searchStu => searchStu.name == nam)

  if (!stu) {
    console.log('No existe el estudiante');
  }
  else {
    console.log('el promedio del estudiante ' + stu.name + ' ' + (stu.math + stu.english + stu.programation) / 3);
  }
}

/*
 * students with average greater than 3
 * 
 */
const studentsAverage = () => {
  toList()
  let average = studentList.filter(aver => (aver.math + aver.english + aver.programation) / 3 >= 3)

  average.forEach(student => {
    console.log('promedio mayor a 3');
    console.log(student.name + '\n');
  });

}

/*
 * update
 * 
 */
const update = (nam, subjtMat, not) => {
  toList()
  let found = studentList.find(searchStu => searchStu.name == nam)

  if (!found) {
    console.log('Estudiante no existe');
  }
  else {
    found[subjtMat] = not
    saveStudents()
  }
}

/*
 * destroy
 * 
 */
const destroy = (nam) => {
  toList()
  let newData = studentList.filter(searchStu => searchStu.name != nam)

  if (newData.length == studentList.length) {
    console.log('ningun estudiante tiene el nombre');
  }
  else {
    studentList = newData
    saveStudents()
  }
}

module.exports = {
  create,
  show,
  showStudent,
  showMath,
  showAverage,
  studentsAverage,
  update,
  destroy
}
