const express = require('express'); // Import the express library here
const path = require('path');
const app = express();              // Instantiate the app here

const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./app/config');

// static files
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

io.on('connection', client => {
  console.log('a user has connected');

  client.emit('message', 'welcome to my page');

  client.on('message', (information) => {
    console.log(information);
  })

});

// Invoke the app's `.listen()` method below:
server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
