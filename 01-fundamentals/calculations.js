let student = {
  name: 'Juan',
  age: 28,
  notes: {
    math: 3,
    english: 4,
    programation: 5
  }
}

let getAverage = (note1, note2, note3) => (note1 + note2 + note3) / 3;

module.exports = {
  student,
  getAverage
};
