const socket = io('http://localhost:8000'); // the "/" namespace
const socket2 = io('http://localhost:8000/admin'); // the "/admin" namespace

socket.on("connect", () => {
    console.log(socket.id);
})

socket2.on("connect", () => {
    console.log('Socket 2', socket2.id);
});


socket.on('message_from_server',(datafromServer)=> {
    socket.emit('message_to_server',{ data : 'This is a client socket.' })
});

socket2.on('welcome', (adminData) => {
    console.log(adminData)
});


document.querySelector('#message-form').addEventListener('submit', (event)=> {
    event.preventDefault();
    console.log('Form Submited');
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('new_message', {text: newMessage});
});

socket.on('message_to_client', (msg) => {
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
})

// socket.on('ping', () => {
//     console.log("Ping was recieved from the server!");
// });
// socket.on('pong',(latency) => {
//     console.log(latency);
//     console.log('Pong was sent to the server');
// });