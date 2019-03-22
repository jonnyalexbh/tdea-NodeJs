const { argv } = require('./01-create-file')
const functions = require('./01-functions')

let command = argv._[0]

switch (command) {
  case 'create':
    functions.create(argv);
    break

  case 'show':
    functions.show();
    break

  case 'showStudent':
    functions.showStudent(argv.name);
    break

  case 'showMath':
    functions.showMath();
    break

  case 'showAverage':
    functions.showAverage(argv.name);
    break

  case 'studentsAverage':
    functions.studentsAverage();
    break

  case 'update':
    functions.update(argv.name, argv.subjectMatter, argv.note);
    break

  case 'destroy':
    functions.destroy(argv.name);
    break

  default:
    console.log('no ingresaste un comando existente');
}
