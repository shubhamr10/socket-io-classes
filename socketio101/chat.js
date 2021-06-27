const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));


const expressServer = app.listen(8000);

const io = socketio(expressServer);
io.on('connection',(socket) => {
    socket.emit('message_from_server', {data : 'This is a socket server'})
    socket.on('message_to_server', (data_from_client) => {
        console.log(data_from_client);
    });
    socket.on('new_message', (msg)=> {
        // console.log(msg);
        io.emit('message_to_client', {text:msg.text});
    });
})