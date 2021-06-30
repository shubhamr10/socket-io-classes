const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));


const expressServer = app.listen(8000);

const io = socketio(expressServer);
// io.on = io.of("/").on
io.on('connection',(socket) => {
    socket.emit('message_from_server', {data : 'This is a socket server'});
    socket.on('message_to_server', (data_from_client) => {
        // console.log(data_from_client);
    });
    socket.on('new_message', (msg)=> {
        // console.log(msg);
        // io.emit('message_to_client', {text:msg.text});
        io.of("/").emit('message_to_client', {text:msg.text});
    });

    // The server can communicate accross the namespace.
    // but on the client_Information, the socket needs to be in that namespace.
    // in order to get that events.
    setTimeout(()=>{
        io.of("/admin").emit('welcome','Welome! Welcome to admin chnnel, from the main channel')
    },2000);
});

io.of("/admin").on('connection', (socket2) => {
    console.log("Someone connected to the admin!!");
    io.of("/admin").emit('welcome','Welome! Welcome to admin chnnel')
});
