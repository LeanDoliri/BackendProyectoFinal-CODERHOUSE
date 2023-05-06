const socket = io();

// carga del historial
socket.emit("usersChatsHistory");

// actualizar historial de chats
socket.on("updateChatHistory", (usersChats) => {
    const container = document.getElementById("chats");
    if (usersChats.length) {
        const html = makeChats(usersChats);
        container.innerHTML = html;
        makeBtnsSend();
    } else {
        const html = `<li class="list-group-item">Aún no hay chats</li>`;
        container.innerHTML = html;
    }
});

// btns enviar mensajes
function makeBtnsSend() {
    const sendMessageList = document.getElementsByClassName("sendMessage");

    for (let i = 0; i < sendMessageList.length; i++) {
        sendMessageList[i].addEventListener("submit", async (e) => {
            e.preventDefault();
            const bodyMessage = document.getElementById(`bodyMessage${e.target.id}`)
            const data = {
                userEmail: e.target.id,
                message: {
                    email: userEmail,
                    type: "admin",
                    date: new Date(),
                    body: bodyMessage.value,
                }
            };

            socket.emit("newMessageAdmin", data);
            bodyMessage.value = "";
        });
    }
}

function makeChats(usersChats) {
    const html = usersChats
        .map((chat) => {
            return `<p class='my-1'>Chat con ${chat.email}</p>
                    <ul class="list-group list-group-flush rounded" id="chat">${makeUserChat(chat.messages)}</ul>
                    <form id="${chat.email}" submit="sendMessage" autocomplete="off" class="sendMessage d-flex align-items-center my-3">
                    <input id="bodyMessage${chat.email}" class="form-control" type="text" name="bodyMessage" required placeholder="...">
                <button class="btn btn-success mx-1" >Enviar</button>
                </form>`;
        })
        .join(" ");
    return html;
}

function makeUserChat(usersChats) {
    const html = usersChats
        .map((message) => {
            return `<li class="list-group-item">
                    <p><strong>${message.email}</strong></p>
                    <p>${message.body}</p>
                    </li>`;
        })
        .join(" ");
    return html;
}
