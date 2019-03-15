const student1 = require('./calculations');

console.log(student1.student);
console.log("the student's average is " + student1.getAverage(student1.student.notes.math, student1.student.notes.english, student1.student.notes.programation));
