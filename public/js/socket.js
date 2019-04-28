socket = io('http://localhost:3000?userId=1');

// eslint-disable-next-line no-undef
const info = document.querySelector('#newCourse');

socket.on('new_course', (data) => {
  info.innerHTML = `Disponible nuevo curso de ${data.name}<br>`;
});

socket.on('user_not_admited', () => {
  console.log('dos');
});
