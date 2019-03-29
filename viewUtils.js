const express = require('express');
const path = require('path');

const nodeModulesDir = path.join(__dirname, './node_modules');

const URL = {
  bootstrapCss: '/bootstrap/dist/css',
  bootstrapJs: '/bootstrap/dist/js',
  jQuery: '/jquery/dist',
  popperJs: '/popper.js/dist',
};

const setupBaseUI = (app) => {
  app.use('/css', express.static(path.join(nodeModulesDir, URL.bootstrapCss)));
  app.use('/js', express.static(path.join(nodeModulesDir, URL.bootstrapJs)));
  app.use('/js', express.static(path.join(nodeModulesDir, URL.jQuery)));
  app.use('/js', express.static(path.join(nodeModulesDir, URL.popperJs)));
};

module.exports = {
  setupBaseUI,
};
