const socket = io('http://localhost:8000');
const socket2 = io('http://localhost:8000/admin');

socket2.on('welcome', (adminData) => {
    console.log(adminData)
});

socket.on('message_from_server', () => {
    socket.emit('message_to_server', { data : 'You have been connected to client.' });
});

document.querySelector('#message-form').addEventListener('submit', (event)=> {
    event.preventDefault();
    console.log('Form Submited');
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('new_message', {text: newMessage});
});

socket.on('message_to_client', (msg) => {
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});