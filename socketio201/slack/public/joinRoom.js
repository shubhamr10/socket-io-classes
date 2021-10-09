function joinRooms(roomName){
 console.log(roomName)   
    //  Send this room to server
    nsSocket.emit('joinRoom', roomName, (newNumbweOfMembers)=> {
        // we want to update the room member total now that we have joined!
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumbweOfMembers} <span class="glyphicon glyphicon-user"></span>`
    });
    nsSocket.on('history_catch_up', (history) => {
        const messageUL = document.querySelector('#messages')
        messageUL.innerHTML = "";
        history.forEach(element => {
            messageUL.innerHTML += buildHTML(element);
        });
        messageUL.scrollTo(0,messageUL.scrollHeight);
    });
    nsSocket.on('update_members',(members)=> {
        document.querySelector('.curr-room-num-users').innerHTML = `${members} <span class="glyphicon glyphicon-user"></span>`;
        document.querySelector('.curr-room-text').innerHTML = `<h3>${roomName}</h3>`
    })

    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input', (e) => {
        let messages = Array.from(document.getElementsByClassName('message-text'));
        console.log(messages);
        messages.forEach(msg => {
            if(msg.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                // the message does not contains the user search
                msg.style.display = "none";
            } else {
                msg.style.display = "block"
            }
        })
    })
}