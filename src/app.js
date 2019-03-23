
const express = require('express');
const app = express();
const path = require('path');

// static files
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
