socket = io()

// socket.on('message', (information) => {
//   console.log(information);
// })

// socket.emit('message', 'I am connected');

// socket.emit('counter');

// socket.on('counter', (counter) => {
//   console.log(counter);
// });

var param = new URLSearchParams(window.location.search);
var user = param.get('name')

socket.on("connect", () => {
  console.log(user)
  socket.emit('userNew', user)
})

socket.on('userNew', (texto) => {
  console.log(texto)
  chat.innerHTML = chat.innerHTML + texto + '<br>'
})

socket.on('userOffline', (texto) => {
  console.log(texto)
  chat.innerHTML = chat.innerHTML + texto + '<br>'
})

const formTest = document.querySelector('#frmtest')
const message = formTest.querySelector('#texttosend')
const chat = document.querySelector('#chat')

formTest.addEventListener('submit', (data) => {
  data.preventDefault()
  socket.emit('texto', message.value, () => {
    message.value = '';
    message.focus();
  });
});

socket.on('texto', (text) => {
  console.log(text);
  chat.innerHTML = chat.innerHTML + text + '<br>';
});
