const http = require('http');
const Websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('Hi there ! The server is working fine....');
});

const wss = new Websocket.Server({server});
wss.on('headers',(headers, req) => {
    // console.log(`header's data --->`, headers);
});

wss.on('connection',(ws, req)=>{
    ws.send('Welcome to Websocket programming!');
    // 
    ws.on('message', (msg)=>{
        console.log(msg)
    })
});

server.listen(8000);