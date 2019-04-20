socket = io()

socket.on('message', (information) => {
  console.log(information);
})

socket.emit('message', 'I am connected');
