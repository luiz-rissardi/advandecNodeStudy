import { fork } from "child_process";
import { Readable } from "stream";

const processes = new Map();
const MAX_PROCESS = 2;

function startNewProcess() {
    const child = fork("./app_childprocess/teste.js");
    processes.set(child.pid, child);

    child.on("exit", () => {
        processes.delete(child.pid);
    });
}

for (let i = 0; i < MAX_PROCESS; i++) {
    startNewProcess();
}

let index = 0;
function getAvailableProcess() {
    const availableProcesses = [...processes.values()].filter((child) => !child.killed);
    if (availableProcesses.length >= index) index = 0;
    if (availableProcesses.length === 0) {
        for (let i = 0; i < MAX_PROCESS; i++) {
            startNewProcess();
        }
        return getAvailableProcess();
    }
    const chosenProcess = availableProcesses[index];
    index++;
    return chosenProcess;
}

export class UserController {

    async findAll(req, res) {
        try {
            const chosenProcessChild = getAvailableProcess();

            function handler(data) {
                chosenProcessChild.kill();
                chosenProcessChild.removeListener("message", handler);
                Readable.from(JSON.stringify(data)).pipe(res);
            }

            chosenProcessChild.on("message", handler);
            chosenProcessChild.send("init");

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}
