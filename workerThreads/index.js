
import { createServer } from "http";
import express,{Router} from "express";
import { ImageController } from "./controller.js";

const app = express();
const server = createServer(app);
const controller = new ImageController();

server
    .listen(4000)
    .once("listening",()=>{
        console.log("server is running at 3000");
    })

const routes = Router();

routes.route("/image").get((req,res) =>{
    controller.joinImages(req,res)
})

app.use(routes)