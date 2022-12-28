const httpServer = require("http").createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    }
})
const path = require('path')
const users = {};

io.on('connection', socket => {
    // user join event
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    });

    // send message event
    socket.on('send-message', message => {
        socket.broadcast.emit("receive-message", { message: message, name: users[socket.id] })
    });

    // calling
    socket.on("create_call", created_call => {
        console.log(created_call);
        socket.broadcast.emit('receive_call',created_call)
    })

    socket.on("receive_call", receive_call => {
        console.log(receive_call);
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id]
    });
})

httpServer.listen(8000)


// main server 

const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.get('', (req, resp) => {
    resp.render('chat')
})

app.listen(3000)