const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

// static files
const publicDirectory = path.join(__dirname, "../public");
const partialsDirectory = path.join(__dirname, "../partials");
app.use(express.static(publicDirectory));

hbs.registerPartials(partialsDirectory);
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {
    student: 'Jonny Alexander'
  });
});

app.post('/calculations', (req, res) => {
  res.render('calculations', {
    student: req.query.name,
    note1: parseInt(req.body.note1),
    note2: parseInt(req.body.note2),
    note3: parseInt(req.body.note3)
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    student: 'error'
  });
})

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
