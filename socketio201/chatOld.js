const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));

const express_server = app.listen(9000);
const io = socketio(express_server);

// Default namespace io.of('/')
io.on('connection', (socket) => {
    socket.emit('message_from_server', { data: 'Welcome to Socket server' });
    socket.on('message_to_server', (data_from_client) => {
        console.log(data_from_client);
    });
    socket.on('new_message_to_server', (message) => {
        // TO send data to all the connected sockets we directly use 'io' instead of 'socket'
        io.emit('message_to_clients', message);
    });
    // You can also send events from another namespance of another namespace
    // setTimeout(() => {
    //     io.of('/admin').emit('welcome', 'Welcome to the admin channel from the main channel');
    // }, 2000);
})

// Admin namespance
io.of('/admin').on('connection', (socket) => {
    io.of('/admin').emit('welcome', 'Welcome to the admin channel');
});