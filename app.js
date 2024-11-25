const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const app = express()
const port = 3000

const server = http.createServer(app)

const io = new Server(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit('recive-location', { id: socket.id, ...data })
    });

    socket.on('disconnect', function () {
        io.emit("user-disconnect", socket.id)
    })
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(port, () => console.log(`server is running at port: ${port}`))