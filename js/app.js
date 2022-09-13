// Variables Globales
let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
let sectionReiniciar = document.getElementById('boton-reiniciar')
let sectionmensajedos = document.getElementById('msj')
let sectionresultados = document.getElementById('ocultar')
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonFuego = document.getElementById('boton-fuego')
let botonAgua = document.getElementById('boton-agua')
let botonTierra = document.getElementById('boton-tierra')
let botonReiniciar = document.getElementById('boton-reiniciar')

let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let inputHipodoge = document.getElementById('hipodoge')
let inputCapipepo = document.getElementById('capipepo')
let inputRatigueya = document.getElementById('ratigueya')
let spanMascotaJugador = document.getElementById('mascota-jugador')

let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

let spanVidasJugador = document.getElementById('vidas-jugador')
let spanVidasEnemigo = document.getElementById('vidas-enemigo')

let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

// Iniciar juego
function iniciarJuego(){
    // No aparezca al inicio del juego
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionmensajedos.style.display = 'none'
    sectionresultados.style.display = 'none'

    //Escuchador de eventos
    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    // Reiniciar juego
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

// Funciones para mascotas
function seleccionarMascotaJugador() {
    // No aparezca al inicio del juego
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona tu mascota')
        reiniciarJuego()
    }

    seleccionarMascotaEnemigo()
}
function seleccionarMascotaEnemigo () {
    let mascotaAleatoria = aleatorio(1,3)

    if (mascotaAleatoria == 1) {
        // Hipodoge
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        // Capipepo
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else if (mascotaAleatoria == 3) {
        // Ratigueya
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    } 
}

// Funciones para ataques
function ataqueFuego() {
    ataqueJugador = 'FUEGO 🔥'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA 💧'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA 🌱'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO 🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA 💧'
    } else {
        ataqueEnemigo = 'TIERRA 🌱'
    }

    combate()
}

// Funcion para el combate
function combate() {
    sectionresultados.style.display = 'block' 
    if(ataqueJugador==ataqueEnemigo){
    crearMensaje("EMPATE")
    }
    else if((ataqueJugador == 'FUEGO 🔥') && (ataqueEnemigo == 'TIERRA 🌱') ||(ataqueJugador == 'AGUA 💧' && ataqueEnemigo == 'FUEGO 🔥') || ataqueJugador == 'TIERRA 🌱' && ataqueEnemigo == 'AGUA 💧'){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

// Funcion para revisar vidas
function revisarVidas(){
    if (vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES! Ganaste 🎉")
    } else if (vidasJugador == 0){
        crearMensajeFinal("Lo siento, perdiste 😔")
    }
}

// Funciones para mensajes, se crea un mensaje nuevo para cada ataque
function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML =resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

// Se crea un Mensaje para el ganador
function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('mensajes-dos')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('boton-reiniciar')
    sectionReiniciar.style.display = 'block'
    let sectionmensajedos = document.getElementById('msj')
    sectionmensajedos.style.display = 'block'
}

// Funciones para aleatoridad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Reiniciar juego
function reiniciarJuego() {
    location.reload()
}

// NOTA: esta es otra manera de llamar al script despues de que se cargue todo el HTML. La funcion iniciarJuego se carga cuando ya todo el contenido esta cargado.

window.addEventListener('load', iniciarJuego)

