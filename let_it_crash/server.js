import express from 'express';
import { createServer } from "http";
import { AsyncLocalStorage } from 'async_hooks';
import { promisify } from "util"

const app = express();
const server = createServer(app);
const asyncStorage = new AsyncLocalStorage();
let i = 0;

app.use(middleware)
app.get("/", async (req, res) => {
    const data = await getDatabase();
    res.json(data);
})

async function getDatabase() {
    i++
    if(i < 5){
        return {message:"ok ola mundo"}
    }else {
        throw new Error("chega de requisições ")
    }
}

server
    .listen(3000)
    .once("listening", () => {
        console.log(`server is running at 3000 port`);
    });



const eventsErrors = ["uncaughtException", "unhandledRejection"];

eventsErrors.forEach(event => {
    process.on(event,async ()=>{
        const { response } = asyncStorage.getStore();
        console.log("closing server...");
        response.end("you are stupid");
        await promisify(server.close.bind(server))();
        console.log("server is closed");
        process.exit(1)
    })
})

function middleware(req,response,next){
    asyncStorage.enterWith({response});
    next()
}