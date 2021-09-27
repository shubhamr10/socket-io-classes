const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));

const express_server = app.listen(9000);
const io = socketio(express_server);

// Default namespace io.of('/')
io.on('connection', (socket) => {
    socket.emit('message_from_server', { data: 'Welcome to socketio server' });
    socket.on('new_message_to_server', (data_from_client) => {
        console.log(data_from_client);
    });
    socket.join('level1');
    socket.to('level1').emit('joined', `Hi ${socket.id} says I have joint level 1 room`)
});

// Admin namespance ('/admin')
io.of('/admin').on('connection', (socket) => {
    console.log('Someone connected to the admin namespance');
    io.of('/admin').emit('welcome', 'Welcome to the admin channel!!');
});