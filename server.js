const httpServer = require("http").createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    }
})

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

    socket.on('disconnect', message => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id]
    });
})

httpServer.listen(8000)