import { createServer } from "http";
import express from "express";
import * as io from "socket.io";
import cors from "cors"

const app = express();
app.use(cors())
const server = createServer(app);
const socketServer = new io.Server(server);

server
    .listen(3000)
    .once("listening", () => {
        console.log("server is running at 3000");
    })


socketServer.on("connection", (socket) => {

    socket.on("enterRoom", (roomNumber) => {

        socket.join(roomNumber)
    })

    socket.on("sendMsgToRoom", (msg, room) => {
        socketServer.to(room).emit("msg", msg);
    })

    socket.on("leftRoom", (room) => {
        socket.leave(room)
    })
})


