formularioCalculadora.addEventListener('submit', (event) => {
  event.preventDefault();
  calcularCalorias();
});

function calcularCalorias() {
  aparecerResultado();

  const tipoDocumento = document.getElementById('tipoDocumento');
  const numDocumento = document.getElementById('numDocumento');
  const nombre = document.getElementById('nombre');
  const edad = document.getElementById('edad');
  const peso = document.getElementById('peso');
  const altura = document.getElementById('altura');
  const sexo = document.querySelector("input[name='genero']:checked");
  const actividad = document.getElementById('actividad');

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  if (
    !(
      numDocumento.value &&
      nombre.value &&
      edad.value &&
      peso.value &&
      altura.value
    )
  ) {
    mostrarMensajeDeError('Debe llenar todos los campos');
    return;
  }

  let calculoDeCalorias = 0.0;

  if (sexo.id === 'masculino') {
    calculoDeCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) +
      5;
  } else {
    calculoDeCalorias =
      actividad.value *
        (multiplicadorTMB.peso * peso.value +
          multiplicadorTMB.altura * altura.value -
          multiplicadorTMB.edad * edad.value) -
      161;
  }

  /*resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center h-100" id="resultadoCalculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${Math.round(
                calculoDeCalorias
                )} kcal" style="font-size: 2rem;" disabled/>
            </div>
        </div>
    `;*/

  let grupoPoblacional = '';

  if (edad.value >= 15 && edad.value <= 29) grupoPoblacional = 'Joven';
  else if (edad.value >= 30 && edad.value <= 59) grupoPoblacional = 'Adultos';
  else grupoPoblacional = 'Adultos mayores';

  resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center h-100" id="resultadoCalculo">
            <h5 class="card-title h2">Resultado</h5>
            <div class="mb-3 w-100">
                <p>El paciente ${nombre.value} identificado con ${
    tipoDocumento.value
  }
                NO. ${numDocumento.value}, requiere un total de ${Math.round(
    calculoDeCalorias
  )} kcal para el sostenimiento de su TMB.</p>
            <p> Usted pertenece al grupo poblacional: ${grupoPoblacional}</p>
            </div>
        </div>
    `;

  tipoDocumento.value = 'CC';
  numDocumento.value = null;
  nombre.value = null;
  peso.value = null;
  altura.value = null;
  edad.value = null;
  actividad.value = '1.2';
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector('#calculo');
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement('div');
  divError.className = 'd-flex justify-content-center align-items-center h-100';
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = '100vh';
  resultado.style.display = 'block';

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = 'none';
      resultado.style.top = 0;
    }
  }, 10);
}
