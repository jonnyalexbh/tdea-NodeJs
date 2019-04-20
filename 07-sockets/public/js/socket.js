socket = io()

socket.on('message', (information) => {
  console.log(information);
})

socket.emit('message', 'I am connected');

socket.emit('counter');

socket.on('counter', (counter) => {
  console.log(counter);
});

const formTest = document.querySelector('#frmtest')
const message = formTest.querySelector('#texttosend')
const chat = document.querySelector('#chat')

formTest.addEventListener('submit', (data) => {
  data.preventDefault()
  const name = data.target.elements.name.value;
  const text = data.target.elements.texttosend.value;
  socket.emit('texto', {
    message: text,
    name: name
  }, () => {
    message.value = '';
    message.focus();
  });
});

socket.on('texto', (text) => {
  console.log(text);
  chat.innerHTML = chat.innerHTML + text.name + ':' + text.message + '<br>';
});
