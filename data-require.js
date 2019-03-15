const { student, getAverage } = require('./calculations');

console.log("the student's name is " + student.name);
console.log("the student's average is " + getAverage(student.notes.math, student.notes.english, student.notes.programation));


let { name, age: ageAlies, notes: { math, english, programation } } = student;
console.log("the student's name is " + name);
console.log("the student's average is " + getAverage(math, english, programation));
console.log("the student's name is " + ageAlies);
