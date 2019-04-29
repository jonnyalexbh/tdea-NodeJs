socket = io('http://localhost:3000?userId=1');

// eslint-disable-next-line no-undef
const newCourse = document.querySelector('#newCourse');
// eslint-disable-next-line no-undef
const closeCourse = document.querySelector('#closeCourse');

socket.on('new_course', (data) => {
  newCourse.innerHTML = `Disponible nuevo curso de ${data.name}`;
});

socket.on('course_update', (data) => {
  closeCourse.innerHTML = `Curso cerrado ${data.name}`;
});
