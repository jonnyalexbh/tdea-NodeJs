socket = io()

socket.on('message', (information) => {
  console.log(information);
})

socket.emit('message', 'I am connected');

socket.emit('counter');

socket.on('counter', (counter) => {
  console.log(counter);
});

document.querySelector('#frmtest').addEventListener('submit', (data) => {
  data.preventDefault()
  const name = data.target.elements.name.value;
  const text = data.target.elements.texttosend.value;
  socket.emit('texto', { message: text, name: name });
});

socket.on('texto', (text) => {
  console.log(text);
});
