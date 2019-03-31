
const express = require('express');

const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const routes = require('../app/routes');

// static files
const publicDirectory = path.join(__dirname, '../public');
const nodeModulesDir = path.join(__dirname, '../node_modules');
const partialsDirectory = path.join(__dirname, '../partials');

app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', routes);

// install boostrap
app.use('/css', express.static(path.join(nodeModulesDir, '/bootstrap/dist/css')));
app.use('/js', express.static(path.join(nodeModulesDir, '/jquery/dist')));
app.use('/js', express.static(path.join(nodeModulesDir, '/popper.js/dist')));
app.use('/js', express.static(path.join(nodeModulesDir, '//bootstrap/dist/js')));

app.set('view engine', 'hbs');

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
