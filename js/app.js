// @ts- check
// Constantes Globales
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("boton-reiniciar");
const sectionmensajedos = document.getElementById("msj");
const sectionresultados = document.getElementById("ocultar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajesResultado = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const sectionMensaje = document.getElementById("mensaje");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

// Variables Globales
let mokepones=[];
let ataqueEnemigo=[];
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
let botones=[];
let ataqueJugador=[];
let vidasJugador=3;
let vidasEnemigo=3;

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
let hipodoge = new Mokepon("Hipodoge", "../assets/img/hipodoge.png", 5);
let capipepo = new Mokepon("Capipepo", "../assets/img/capipepo.png", 5);
let ratigueya = new Mokepon("Ratigueya", "../assets/img/ratigueya.png", 5);

// Creacion e inserción de los ataques a los objetos creados
hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);
capipepo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);
ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);
mokepones.push(hipodoge, capipepo, ratigueya);

// Iniciar juego

function iniciarJuego() {
  // No aparezca al inicio del juego
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  sectionmensajedos.style.display = "none";
  sectionresultados.style.display = "none";

  //   Iterador para generar mokepones dependiendo de la cantidad de pokemones que se agreguen en el arreglo
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  inputHipodoge = document.getElementById("Hipodoge");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");

  //Escuchador de eventos
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  // Reiniciar juego
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

// Funciones para mascotas
function seleccionarMascotaJugador() {
  // No aparezca al inicio del juego
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona tu mascota");
    reiniciarJuego();
  }
  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}
function extraerAtaques(mascotaJugador){
  let ataques 
  for(let i=0; i<mokepones.length; i++){
    if(mascotaJugador === mokepones[i].nombre){;
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}
function mostrarAtaques(ataques){
  ataques.forEach((ataque)=>{
    ataquesMokepon = `
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  })

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");

  botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
  botones.forEach((boton)=>{
    boton.addEventListener('click', (e)=>{
      if(e.target.textContent === '🔥'){
        ataqueJugador.push('FUEGO');
        boton.style.background = '#112f58';
        console.log(ataqueJugador)
      } 
      else if(e.target.textContent === '💧'){
        ataqueJugador.push('AGUA');
        boton.style.background = '#112f58';
        console.log(ataqueJugador)
      } 
      else if(e.target.textContent === '🌱'){
        ataqueJugador.push('TIERRA');
        boton.style.background = '#112f58';
        console.log(ataqueJugador)
      }
      ataqueAleatorioEnemigo();
    })
  })
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(1, mokepones.length-1);

  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque();
}

// Funciones para ataques
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  console.log(ataqueEnemigo)

  combate();
}

// Funcion para el combate
function combate() {
  sectionresultados.style.display = "block";
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (
    (ataqueJugador == "FUEGO 🔥" && ataqueEnemigo == "TIERRA 🌱") ||
    (ataqueJugador == "AGUA 💧" && ataqueEnemigo == "FUEGO 🔥") ||
    (ataqueJugador == "TIERRA 🌱" && ataqueEnemigo == "AGUA 💧")
  ) {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  revisarVidas();
}

// Funcion para revisar vidas
function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES! Ganaste 🎉");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, perdiste 😔");
  }
}

// Funciones para mensajes, se crea un mensaje nuevo para cada ataque
function crearMensaje(resultado) {
  let nuevoAtaqueJugador = document.createElement("p");
  let nuevoAtaqueEnemigo = document.createElement("p");

  sectionMensajesResultado.innerHTML = resultado;
  nuevoAtaqueJugador.innerHTML = ataqueJugador;
  nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

// Se crea un Mensaje para el ganador
function crearMensajeFinal(resultadoFinal) {
  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultadoFinal;

  sectionMensaje.appendChild(parrafo);

  botonFuego.disabled = true;

  botonAgua.disabled = true;

  botonTierra.disabled = true;

  sectionReiniciar.style.display = "block";

  sectionmensajedos.style.display = "block";
}

// Funciones para aleatoridad
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Reiniciar juego
function reiniciarJuego() {
  location.reload();
}

// NOTA: esta es otra manera de llamar al script despues de que se cargue todo el HTML. La funcion iniciarJuego se carga cuando ya todo el contenido esta cargado.

window.addEventListener("load", iniciarJuego);
