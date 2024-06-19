if (process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const router = require("./routers")
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: [ "GET", "POST" ]
	}
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})



server.listen(5001, () => console.log("server is running on port 5001"))