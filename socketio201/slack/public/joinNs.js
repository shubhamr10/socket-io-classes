function joinNs(endpoint){
    if(nsSocket){
        // check to see if ns socket is actually a socket
        nsSocket.close();
        // remmove the eventlistner before its actually added again
        document.querySelector('#user-input').removeEventListener('submit', customFormSubmission);

    }
    nsSocket = io(`http://localhost:9000${endpoint}`);
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        nsRooms.forEach((room)=>{
            roomList.innerHTML+= `<li class='room'><span class="glyphicon glyphicon-${room.privateRoom ? 'lock' : 'globe'}"></span>${room.roomTitle}</li>`
        });
        // add click listner to each of the room
        let roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elem) => {
            elem.addEventListener('click', (e) => {
                console.log(`Someone clicked on ${e.target.innerText}`);
                const roomName = e.target.innerText;
                joinRooms(roomName);
            })
        });
        // Add rooms automatically
        const topRoom = document.querySelector('.room');
        const topRoomName = topRoom.innerText;
        console.log('topRoomName==>', topRoomName);
        joinRooms(topRoomName);
    });

    nsSocket.on('messageToClients', (msg)=>{
        console.log('msg',msg)
        document.querySelector('#messages').innerHTML += buildHTML(msg);
    });

    document.querySelector('.message-form').addEventListener('submit',customFormSubmission);
}

function customFormSubmission(event){
    event.preventDefault();
    const new_message = document.querySelector('#user-message').value;
    nsSocket.emit('new_message_to_server', { text: new_message });
    document.querySelector('#user-message').value = ""
}

function buildHTML(msg){
    const newHTML = `<li>
    <div class="user-image">
        <img src="${msg.avatar}" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msg.username} <span>${new Date(msg.time).toLocaleString()}</span></div>
        <div class="message-text">${msg.text}</div>
    </div>
</li>`;
return newHTML;
}