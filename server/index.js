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

const roomLimit = 100;
let rooms = [];

function generateCode() {
    let code;
    do {
        code = Math.floor(Math.random() * roomLimit);
    } while (rooms.includes(code));

    if (code < 10) {
        code = `0${code}`;
    }
    return code;
}

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('join', (room) => {
        console.log(`🚪: ${socket.id} joined room ${room}`);
        socket.to(room).emit('userJoined');
        socket.join(room);

    });

    socket.on('create', () => {
        const room = generateCode();
        rooms.push(room);
        console.log(`🏠: ${socket.id} created room ${room}`);
        socket.emit('code', room);
        socket.join(room);
    });

    socket.on('jump', (userId, room) => {
        console.log(`👟: ${userId} jumped to room ${room}`);
        socket.broadcast.to(room).emit('jump', userId);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});