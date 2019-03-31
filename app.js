const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const ViewUtils = require('./viewUtils');
const routes = require('./app/routes');

// static files
const publicDirectory = path.join(__dirname, './public');
const partialsDirectory = path.join(__dirname, './partials');
hbs.registerPartials(partialsDirectory);

const app = express();
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', routes);

// install boostrap
ViewUtils.setupBaseUI(app);

app.set('view engine', 'hbs');

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});