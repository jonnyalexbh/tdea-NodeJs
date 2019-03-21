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

const argv = require('yargs')
  .command('create', 'crear un estudiante en mi BD', creation)
  .command('show', 'muestra los estudiantes y sus notas')
  .command('showStudent', 'mostrar la informacion de un estudiante', showStudent)
  .command('showAverage', 'mostrar promedio del estudiante', showAverage)
  .command('studentsAverage', 'mostrar estudiantes con promedio mayor a 3')
  .argv

module.exports = {
  argv
};
