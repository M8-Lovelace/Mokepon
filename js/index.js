// @ts- check
// -------------------------Constantes Globales---------------------------------
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
sectionReiniciar.style.display = 'none';

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

// --------------------------Variables Globales---------------------------------
let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;

// -------------------------------OBJETOS---------------------------------------
// Creacion del constructor y atributos del objeto
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}
// Inserción de atributos de cada objeto
let hipodoge = new Mokepon('Hipodoge', '../assets/img/hipodoge.png', 5);
let capipepo = new Mokepon('Capipepo', '../assets/img/capipepo.png', 5);
let ratigueya = new Mokepon('Ratigueya', '../assets/img/ratigueya.png', 5);

// Creacion e inserción de los ataques a los objetos creados
hipodoge.ataques.push(
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🌱', id: 'boton-tierra' }
);
capipepo.ataques.push(
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' }
);
ratigueya.ataques.push(
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🌱', id: 'boton-tierra' }
);
mokepones.push(hipodoge, capipepo, ratigueya);

// -----------------------------INICIO JUEGO-------------------------------------
// Iniciar juego
function iniciarJuego() {
  // No aparezca al inicio del juego
  sectionSeleccionarAtaque.style.display = 'none';

  //   Iterador para generar mokepones dependiendo de la cantidad de pokemones que se agreguen en el arreglo
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
  });

  //Escuchador de eventos
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  // Reiniciar juego
  botonReiniciar.addEventListener('click', reiniciarJuego);
}

// ------------------------FUNCIONES PARA MASCOTAS-------------------------------
// -------------------------------DEFINIR----------------------------------------
// Definir la mascota del jugador dependiendo del boton seleccionado
function seleccionarMascotaJugador() {
  // No aparezca al inicio del juego
  sectionSeleccionarMascota.style.display = 'none';
  sectionSeleccionarAtaque.style.display = 'flex';

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert('Selecciona una mascota');
  }

  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}
// Extraer los ataques predefinidos de la mascota seleccionada
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}
// Imprimir los ataques predefinidos de la mascota seleccionada
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById('boton-fuego');
  botonAgua = document.getElementById('boton-agua');
  botonTierra = document.getElementById('boton-tierra');
  botones = document.querySelectorAll('.BAtaque');
}
// Definir los nombres de los ataque dependiendo del boton seleccionado
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      } else {
        ataqueJugador.push('TIERRA');
        console.log(ataqueJugador);
        boton.style.background = '#112f58';
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}
// Definir la mascota del enemigo de forma aletoria
function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque();
}

// -------------------------------ATAQUES----------------------------------------
// Funciones para ataques
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO');
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA');
  } else {
    ataqueEnemigo.push('TIERRA');
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}
// Funcion para iniciar la pelea solo cuando se definan los 5 ataques
function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}
// Funcion para definir cada ataque y no imprimir el array
function indexAmbosOponente(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

// -------------------------------COMBATE----------------------------------------
// Funcion para el combate
function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponente(index, index);
      crearMensaje('EMPATE');
    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
      indexAmbosOponente(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
      indexAmbosOponente(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
      indexAmbosOponente(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponente(index, index);
      crearMensaje('PERDISTE');
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVictorias();
}

// Funcion para revisar vidas
function revisarVictorias() {
  if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('FELICITACIONES! Ganaste 🎉');
  } else if (victoriasJugador < victoriasEnemigo) {
    crearMensajeFinal('Lo siento, perdiste 😔');
  } else if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal('Fue un empate 😀​');
  }
}

// Funciones para mensajes, se crea un mensaje nuevo para cada ataque
function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Se crea un Mensaje para el ganador
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = 'block';
}

// --------------------------------OTROS
// Funciones para aleatoridad
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Reiniciar juego
function reiniciarJuego() {
  location.reload();
}

// NOTA: esta es otra manera de llamar al script despues de que se cargue todo el HTML. La funcion iniciarJuego se carga cuando ya todo el contenido esta cargado.

window.addEventListener('load', iniciarJuego);
