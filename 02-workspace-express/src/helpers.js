const hbs = require('hbs');

hbs.registerHelper('getAverage', (note1, note2, note3) => {
  return (note1 + note2 + note3) / 3
});
