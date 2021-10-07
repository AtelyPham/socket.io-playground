const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server, {
  cors: "*",
})

app.get("/", (req, res) =>
  res.sendFile("public/index.html", { root: __dirname })
)

io.on("connection", socket => {
  console.log(`New connection with id ${socket.id}`)
  socket.broadcast.emit("chat_message", `New connection with id ${socket.id}`)

  socket.on("chat_message", message => {
    socket.broadcast.emit("chat_message", message)
  })

  socket.on("disconnect", () => {
    console.log(`User with id ${socket.id} disconntected`)
    socket.broadcast.emit(
      "chat_message",
      `A user with id ${socket.id} is disconnected`
    )
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log("Server is listening in port " + PORT))
