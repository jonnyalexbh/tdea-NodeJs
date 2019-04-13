const express = require('express'); // Import the express library here
const app = express();              // Instantiate the app here

const PORT = process.env.PORT || 4001;

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
