import express from "express";
import { createServer } from "http";
import { middleWareMonitoring } from "./spies.js";

const app = express();
const server = createServer(app);

app.use(middleWareMonitoring);

app.get("/", (req, res) => {
    setTimeout(() => {
        res.json({ message: "um simples teste" })
    }, 200);
})

server
    .listen(3000)
    .once("listening", () => {
        console.log(`server is running at ${server.address().port} PORT`);
    })
