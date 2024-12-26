const express = require('express');
const app = express();
const PORT = 3000;

// New imports
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('create', () => {
        console.log(`🏠: ${socket.id} created room ${socket.id}`);
        socket.join(socket.id);
    });
    socket.on('join', (room) => {
        console.log(`🚪: ${socket.id} joined room ${room}`);
        socket.join(room);
    });
    socket.on('jump', (room) => {
        console.log(`🚪: ${socket.id} jumped to room ${room}`);
        socket.join(room);
        socketIO.in(room).emit('jump');
    });
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});