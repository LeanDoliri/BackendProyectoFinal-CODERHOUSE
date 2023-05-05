const socket = io();

// carga del historial
socket.emit("chatHistory", userEmail);

// enviar mensajes
const sendMessage = document.getElementById('sendMessage');
const bodyMessage = document.getElementById('bodyMessage')
sendMessage.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = {
        email: userEmail,
        type: 'user',
        date: new Date(),
        body: bodyMessage.value
    }

    socket.emit("newMessage", message);
    bodyMessage.value = "";
})

// actualizar chat
socket.on("updateChat", (messagesDB) => {
    const container = document.getElementById("chat");
    if (messagesDB.length){
        const html = makeChat(messagesDB);
        container.innerHTML = html;
    } else {
        const html = `<li class="list-group-item">Aún no hay mensajes</li>`;
        container.innerHTML = html;
    }
    
});

function makeChat(messagesDB) {
    const html = messagesDB
    .map((message) => {
      return    `<li class="list-group-item">
                <p><strong>${message.email}</strong></p>
                <p>${message.body}</p>
                </li>`;
    })
    .join(" ");
  return html;
}
