socket = io()

socket.on('message', (information) => {
  console.log(information);
})

socket.emit('message', 'I am connected');

socket.emit('counter');

socket.on('counter', (counter) => {
  console.log(counter);
});
