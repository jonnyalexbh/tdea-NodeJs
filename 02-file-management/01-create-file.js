const name = {
  demand: true,
  alias: 'n'
}

const math = {
  demand: true,
  alias: 'm'
}

const english = {
  demand: true,
  alias: 'i'
}

const programation = {
  demand: true,
  alias: 'p'
}

const creation = {
  name,
  math,
  english,
  programation
}

const showStudent = {
  name
}

const showAverage = {
  name
}

const update = {
  name,
  subjectMatter: {
    demand: true,
    alias: 'a'
  },
  note: {
    demand: true,
    alias: 'c'
  }
}

const argv = require('yargs')
  .command('create', 'crear un estudiante en mi BD', creation)
  .command('show', 'muestra los estudiantes y sus notas')
  .command('showStudent', 'mostrar la informacion de un estudiante', showStudent)
  .command('showAverage', 'mostrar promedio del estudiante', showAverage)
  .command('studentsAverage', 'mostrar estudiantes con promedio mayor a 3')
  .command('update', 'actualiza la informacion de un curso', update)
  .argv

module.exports = {
  argv
};
