const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
  constructor(id){
    this.id = id
  }

  asignarMokepon(mokepon){
    this.mokepon = mokepon
  }

  actualizarPosicion(x, y){
    this.x = x
    this.y = y
  }
}

class Mokepon{
  constructor(nombre){
    this.nombre = nombre
  }
}

// Se solicita un recurso con una petición GET
app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`
  const jugador = new Jugador(id)

  jugadores.push(jugador)

  res.setHeader("Access-Control-Allow-Origin", "*")

  res.send(id)
})

app.post("/mokepon/:jugadorId",(req,res)=>{
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)

  const juagadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if(juagadorIndex >= 0){
    jugadores[juagadorIndex].asignarMokepon(mokepon)
  }

  console.log(jugadores)
  console.log(jugadorId)

  res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0

  const juagadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

  if(juagadorIndex >= 0){
    jugadores[juagadorIndex].actualizarPosicion(x, y)
  }

  const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId)

  res.send({
    enemigos
  })
})

// Se inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Server is running')
})