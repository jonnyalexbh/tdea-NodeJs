const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

// static files
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {
    student: 'Jonny Alexander'
  });
});

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
