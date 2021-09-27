const socket = io('http://localhost:9000');  // the default '/' namespace
const socket2 = io('http://localhost:9000/admin'); // the /admin namespace


socket.on('connect', () => {
    console.log('Default namespace socket id==>  ', socket.id);
});

socket2.on('connect', () => {
    console.log('Admin namespace socket id==>  ', socket2.id);
})

socket2.on('welcome', (message) => {
    console.log('mes',message)
})

socket.on('message_from_server', (message_from_server) => {
    console.log('message_from_server',message_from_server);
    socket.emit('message_to_server',{data : 'This is from the client.!'})
});

// socket.on('ping', () => {
//     console.log('Ping was recieved from the server.');
// });

// socket.on('pong', (latency)=>{
//     console.log('Pong was recieved!. ==>', latency)
// });

document.querySelector('#message-form').addEventListener('submit', (event)=> {
    event.preventDefault();
    const new_message = document.querySelector('#user-message').value;
    socket.emit('new_message_to_server', { text: new_message });
})

socket.on('message_to_clients', (message)=> {
    document.querySelector('#messages').innerHTML+= `<li>${message.text}</li>`;
})