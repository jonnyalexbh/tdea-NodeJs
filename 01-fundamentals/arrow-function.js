function promedio1(nota1, nota2, nota3) {
  let resultado = (nota1 + nota2 + nota3) / 3
  console.log('El promedio 1 es ' + resultado);
}

let promedio2 = (nota1, nota2, nota3) => {
  let resultado = (nota1 + nota2 + nota3) / 3
  console.log('El promedio 2 es ' + resultado);
}

let promedio3 = (nota1, nota2, nota3) => console.log('El promedio 3 es ' + (nota1 + nota2 + nota3) / 3);

promedio1(3, 4, 5);
promedio2(1, 2, 1);
promedio3(5, 4, 5);
