const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname+'/public'));

const expressServer = app.listen(9000);

const io = socketio(expressServer);
// You can use connect or connection , both are same
io.on('connection', (socket) => {
    socket.emit('message_from_server', { data: 'This is a message from server!' });
    socket.on('message_to_server', (message_from_client)=> {
        console.log('Message from client===>', message_from_client);
    });
    socket.on('new_message_to_server', (new_message) =>{
        io.emit('message_to_clients', new_message);
    });
});

/* 
 on => `on` is used listen to an event
 `emit` => `emit` is used to emit an event
*/

/* 
    Things to know.
    * socket is only started after connecting to namespace, On Line no 3 it is just a name,
    the actual socket starts from the cb at line 11

    * Socket class has been emitted from event emitter class from node js

*/