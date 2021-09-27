const socket = io('http://localhost:9000');  // the default '/' namespace
const socket2 = io('http://localhost:9000/admin'); // the /admin namespace

socket.on('message_from_server', (message_from_server) => {
    console.log('message_from_server==>',message_from_server);
    socket.emit('message_to_server',{data : 'This is from the client.!'})
});

socket.on('joined', (msg)=>{
    console.log(msg);
})

socket2.on('welcome', (data_from_server) => {
    console.log(data_from_server);
});

document.querySelector('#message-form').addEventListener('submit', (event)=> {
    event.preventDefault();
    const new_message = document.querySelector('#user-message').value;
    socket.emit('new_message_to_server', { text: new_message });
});