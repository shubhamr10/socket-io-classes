const username = window.prompt('What is your username');
const socket = io('http://localhost:9000',{
    query:{
        username:username
    }
});  // the default '/' namespace
let nsSocket = "";


// listen for the list of all the sockets
socket.on('ns_list',(nsData) => {
    let namespace_div = document.querySelector('.namespaces');
    namespace_div.innerHTML = '';
    nsData.forEach(ns => {
        namespace_div.innerHTML+= `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`
    });

    // add a click-listners
    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click', e => {
            const nsEndpoint = elem.getAttribute('ns');
            console.log(nsEndpoint)
            joinNs(nsEndpoint);
        })
    });
    joinNs('/wiki');
})