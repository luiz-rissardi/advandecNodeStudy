import { Worker } from "worker_threads";

function createThread({from,to}){
    const worker = new Worker("./worker.js");
    const prom = new Promise((resolve,reject) => {
        worker.once("message",resolve);
        worker.once("error",reject);
    })
    worker.postMessage({from,to});
    return prom
}

Promise.allSettled([
    createThread({from:0,to:1e9}),
    createThread({from:0,to:1e9}),
    createThread({from:0,to:1e9}),
    createThread({from:0,to:1e9}),
])