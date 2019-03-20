const options = {
  math: {
    default: 0,
    alias: 'm'
  },
  english: {
    default: 0,
    alias: 'i'
  },
  programming: {
    demand: true,
    alias: 'p'
  }
}

const argv = require('yargs')
  .command('average', 'calculate the average', options)
  .argv

console.log(argv.math);
console.log(argv);
console.log('the average is ' + (argv.m + argv.i * argv.p) / 3);
// console.log("the student's name is " + argv.name);
