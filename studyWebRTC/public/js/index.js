import { createOffer, createPeer, answerPeer } from "./peer.js";
import { User } from "./user.js";

let socket;
let myStream;
const users = new Map();
document.getElementById("btn-enter-room")?.addEventListener("click", enterInRoom);
document.getElementById("sendMessage").addEventListener("click", sendMessage);

myStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
document.getElementById("playerMe").srcObject = myStream

function sendMessage() {
    const message = document.getElementById("message").value
    for (let user of users.values()) {
        user.sendMessage(message)
    }
}

function initServer(room) {
    socket = io.connect("http://localhost:3000", {
        path: '/socket.io',
        transports: ['websocket'],
        query: {
            room: room
        }
    });

    socket.on("call", (data) => {
        const user = new User(data.id);
        user.peerConnection = createPeer(user);
        users.set(user.id, user);
        createOffer(user)
    })

    socket.on("offer", (data) => {
        let user = users.get(data.id);
        if (user) {
            answerPeer(user);
        } else {
            const user = new User(data.id)
            user.peerConnection = createPeer(user)
            users.set(data.id, user)
            answerPeer(user, data.offer)
        }
    })

    socket.on("answer", (data) => {
        const user = users.get(data.id);
        if (user) {
            user.peerConnection.setRemoteDescription(data.answer)
        }
    })

    socket.on("candidate", (data) => {
        const user = users.get(data.id)
        if (user) {
            user.peerConnection.addIceCandidate(data.candidate)
        } else {
            const user = new User(data.id)
            user.peerConnection = createPeer(user)
            user.peerConnection.addIceCandidate(data.candidate)
            users.set(data.id, user)
        }
    })
}

function enterInRoom() {
    const room = document.getElementById("room").value;
    initServer(room);
}


export {
    socket,
    myStream
}