const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));

const express_server = app.listen(8000);
const io = socketio(express_server);

io.on('connection', (socket) => {
    socket.emit('message_from_server', { data: 'Connection made to the / namespace' });
    socket.emit('message_to_server', (data) => console.log(data));
});

io.of('/admin').on('connection',(socket2) =>{
    console.log('Connected to /admin namespace!');
    io.of('/admin').emit('welcome', 'Welcome to admin namespace!!');
});

