const express = require('express'); // Import the express library here
const app = express();              // Instantiate the app here

const PORT = process.env.PORT || 4001;

// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Open a call to `app.get()` below:
app.get('/expressions', (req, res, next) => {
  res.send('Hello World!');
});

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
