const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('I am connected as a socket.io server');
});

const io = socketio(server);

io.on('connection', (socket, req)=>{
    socket.emit('welcome','Welcome to Socket.io Programmin!!!!');
    socket.on('message',(msg)=>{
        console.log(msg);
    });
});

server.listen(8000);