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

const argv = require('yargs')
  .command('create', 'crear un estudiante en mi BD', creation)
  .argv

module.exports = {
  argv
};
