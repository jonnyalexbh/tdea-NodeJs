const { student, getAverage } = require('./calculations');
const fs = require('fs');

console.log("the student's name is " + student.name);
console.log("the student's average is " + getAverage(student.notes.math, student.notes.english, student.notes.programation));


let { name, age: ageAlies, notes: { math, english, programation } } = student;
console.log("the student's name is " + name);
console.log("the student's average is " + getAverage(math, english, programation));
console.log("the student's name is " + ageAlies);


let createFile = (schoolChild) => {
  testText = "the student's name is " + name + '\n' +
    'has obtained an average of ' + getAverage(math, english, programation);
  fs.writeFile('average.txt', testText, (err) => {
    if (err) throw (err)
    console.log('the file has been created');
  })
}

createFile(student);
