const express = require('express')
const app = express()
const http = require('http')
const SocketsServer = require('socket.io')
const SOCKETS = require('./socket-routes.js')
const port = process.argv[2] || 80

// serve up the www folder for all static files (HTML, CSS, images, etc)
app.use(express.static(`${__dirname}/www`))

// setup socket connection
const io = new SocketsServer.Server()
io.on('connection', (socket) => SOCKETS(socket, io))

// setup + run socket server
const httpServer = http.createServer(app)
io.attach(httpServer)
// run the server, it automatically starts listening for requests
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
