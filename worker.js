import { parentPort,threadId } from "worker_threads"

parentPort.on("message",({ from,to })=>{
    const start = performance.now();
    for(let i=from;i<to;i++);
    const end = performance.now();
    console.log(`thread[${threadId}] time execution ${end-start}`);
    parentPort.postMessage(`i am thread[${threadId}] and i done`)
})