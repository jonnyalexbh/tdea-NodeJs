const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

// static files
const publicDirectory = path.join(__dirname, "../public");
const partialsDirectory = path.join(__dirname, "../partials");
app.use(express.static(publicDirectory));

hbs.registerPartials(partialsDirectory);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {
    student: 'Jonny Alexander'
  });
});

app.get('/calculations', (req, res) => {
  res.render('calculations', {
    student: 'Tankis Alexis'
  });
});

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
