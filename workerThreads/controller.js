

import { parse } from "url";
import { fork } from "child_process";

const processes = new Map();
const MAX_PROCESS = 3;

function startNewProcess() {
    const child = fork("./workerThreads/process.js");
    processes.set(child.pid, child);

    child.on("exit", () => {
        processes.delete(child.pid);
        startNewProcess()
    });

}

for (let i = 0; i < MAX_PROCESS; i++) {
    startNewProcess();
}


let index = 0;
function getAvailableProcess() {
    const availableProcesses = [...processes.values()].filter((child) => !child.killed);
    if (availableProcesses.length >= index) index = 0;
    const chosenProcess = availableProcesses[index];
    index++;
    return chosenProcess;
}


export class ImageController {
    async joinImages(req, res) {
        const { query: { image, background } } = parse(req.url, true);
        const child = getAvailableProcess();
        function handler(result) {
            child.removeAllListeners("message");
            // child.kill();
            if (!result?.error) {
                res.writeHead(200, {
                    "content-type": "text/html"
                });
                res.write(result);
            } else {
                res.writeHead(500);
            }
            res.end()
        }
        child.on("message", handler);
        child.send({ image, background })
    }
}