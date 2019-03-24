
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

routes = require('../app/routes')

// static files
const publicDirectory = path.join(__dirname, "../public");
const dirNode_modules = path.join(__dirname, '../node_modules')
const partialsDirectory = path.join(__dirname, "../partials");

app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', routes);

// install boostrap
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.set('view engine', 'hbs');

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
