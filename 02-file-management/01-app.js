const { argv } = require('./01-create-file')
const functions = require('./01-functions')

let command = argv._[0]

if (argv._[0] == 'create') {
  functions.create(argv)
}
