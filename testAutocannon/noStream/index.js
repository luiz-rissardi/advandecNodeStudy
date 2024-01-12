import express, { Router } from "express"
import http from "http"
import database from "../withStream/database.js";


const app = express();
const routes = Router();

routes.route("/get").get((req, res) => {
    res.json(database);
    res.end(); 
})

app.use("/api",routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("server running at 3000");
})