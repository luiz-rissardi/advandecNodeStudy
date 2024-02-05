import express from "express";
import { AsyncLocalStorage } from "async_hooks";
import http,{ createServer } from "http";
import { randomUUID } from "crypto";
import { promisify } from "util";


const app = express();
const asyncLocalStorage = new AsyncLocalStorage()

// asyncLocalStorage.run({teste:"ola mundo"},()=>{
//     console.log(asyncLocalStorage.getStore());
// })

const server = createServer(app);
app.use(mappedConnection);

let i = 0;

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
        console.log(`server is running at ${server.address().port}`);
    })



function mappedConnection(req, res, next) {
    asyncLocalStorage.enterWith({ response: res, id: randomUUID() });
    next();
}



for (const event of ["uncaughtException", "unhandledRejection"]) {
    process.once(event, async (message) => {
        const { response, id } = asyncLocalStorage.getStore();
        response.end("you are stupid");
        console.log(`closing server ... `);
        await promisify(server.close.bind(server))();
        console.log("sevrer close");
    })
}