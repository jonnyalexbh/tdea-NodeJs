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

  default:
    console.log('no ingresaste un comando existente');
}
