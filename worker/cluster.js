import cluster from "cluster";
import { cpus } from "os";
import { runServer } from "./server.js"
 
if (cluster.isPrimary) {
    for (let index = 0; index < cpus().length; index++) {
        const worker = cluster.fork();
        console.log(`worker running at ${worker.process.pid}`);
    }

    cluster.on("exit", (worker, code, signal) => {
        const fork = cluster.fork();
        console.log(`worker died, new worker running at ${fork.process.pid}`);
    })
}else{
    runServer();
}