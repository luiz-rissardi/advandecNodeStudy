import { createServer } from "http";
import { start } from "./spies.js";



start();
const server = createServer((req, res) => {
    setTimeout(() => {
        res.write(" um simples teste");
        res.end();
    }, 200);
})

server
    .listen("3000")
    .once("listening",()=>{
        console.log(`server is runnint at ${server.address().port}`);
    })


