const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from Admin text Welcome to the chat app 
    socket.emit('newMessage', {
        from: 'Amin',
        text: 'Welcome to the chat',
        createdAt: new Date().getTime()
    });

    // socket.broadcast.emit from Admin New joined
    socket.broadcast.emit('newMessage', {
        from: 'Amin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnect');
    });
})

server.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});