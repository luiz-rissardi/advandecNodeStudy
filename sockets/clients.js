import io from "socket.io-client";

const socket = io("http://localhost:3000/socket.io",{
    transports:["websocket"]
});
console.log("connectando");



socket.on("msg", (msg) => {
    console.log(msg);
})
socket.emit("msg",{ message:"oi de novo" })
