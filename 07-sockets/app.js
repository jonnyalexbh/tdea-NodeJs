const express = require('express'); // Import the express library here
const path = require('path');
const app = express();              // Instantiate the app here

require('./app/config');

// static files
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// Invoke the app's `.listen()` method below:
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
