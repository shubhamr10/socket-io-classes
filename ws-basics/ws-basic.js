const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected to the server')
});

const wss = new websocket.Server({server})

/* 
    'headers' events are used to check the header
*/
// wss.on('headers',(headers, req) => {
//     console.log('headers==>',headers);
// });

/* 
* Connection means socket handshake has been complete
*/
wss.on('connection',(ws, req)=>{
    ws.send('Welcome to socket server');
    ws.on('message', (msg) => {
        console.log(msg)
    })
})

server.listen(8000);