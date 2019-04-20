const express = require('express'); // Import the express library here
const path = require('path');
const app = express();              // Instantiate the app here

const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./app/config');

// static files
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// counter = 0
const { Users } = require('./app/users');
const users = new Users();

io.on('connection', client => {
  console.log('a user has connected');

  // client.emit('message', 'welcome to my page');

  // client.on('message', (information) => {
  //   console.log(information);
  // })

  // client.on('counter', () => {
  //   counter++;
  //   console.log(counter);
  //   io.emit('counter', counter);
  // });

  client.on('userNew', (user) => {
    let list = users.addUser(client.id, user)
    console.log(list)
    let texto = `Se ha conectado ${user}`
    io.emit('userNew', texto)
  })

  client.on('disconnect', () => {
    let userToRemove = users.removeUser(client.id)
    let texto = `Se ha desconectado ${userToRemove.name}`
    io.emit('userOffline', texto)
  })

  client.on('texto', (text, callback) => {
    let user = users.getUser(client.id)
    let texto = `${user.name} : ${text}`

    io.emit('texto', (texto))
    callback()
  })

});

// Invoke the app's `.listen()` method below:
server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
