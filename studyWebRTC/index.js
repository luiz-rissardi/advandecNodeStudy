import * as io from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const socketIo = new io.Server(server);

server.listen(3000)
server.addListener("listening", () => {
    console.log("server is running at 3000");
})

socketIo.on("connection", (socket) => {
    const room = socket.handshake.query.room;
    if (!room) {
        socket.disconnect();
    } else {
        console.log("new socket connected in room", room);
        socket.join(room);
        socket.to(room).emit("call", { id: socket.id });

        socket.on("offer", (data) => {
            console.log(`socket ${socket.id} offer to ${data.id}`);
            socket.to(data.id).emit("offer", {
                id: socket.id,
                offer: data.offer
            })
        })

        socket.on("answer", (data) => {
            console.log(`socket ${socket.id} answering to ${data.id}`);
            socket.to(data.id).emit("answer", {
                id: socket.id,
                answer: data.answer
            })
        })

        socket.on("candidate",(data)=>{
            socket.to(data.id).emit("candidate",{
                id:socket.id,
                candidate:data.candidate
            })
        })
    }
})
