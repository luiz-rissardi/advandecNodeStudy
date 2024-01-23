import { fork } from "child_process";

const processes = new Map();
const MAX_PROCESS = 1;


function startNewProcess() {
    const child = fork("./app_childprocess/teste.js");
    processes.set(child.pid, child);

    child.on("exit", () => {
        processes.delete(child.pid);
        startNewProcess();
    });
}

// Inicia o número máximo definido de processos
for (let i = 0; i < MAX_PROCESS; i++) {
    startNewProcess();
}

function getAvailableProcess() {
    const availableProcesses = [...processes.values()].filter((child) => !child.killed);
    if (availableProcesses.length === 0) {
        // Se não houver processos disponíveis, inicia um novo processo
        startNewProcess();
        return getAvailableProcess(); // Chama recursivamente para garantir que haja pelo menos um processo
    }

    return availableProcesses[0]; // Retorna o primeiro processo disponível
}

export class UserController {
    
    async findAll(req, res) {
        try {
            const chosenProcessChild = getAvailableProcess();

            function handler(data) {
                res.json(data);
                chosenProcessChild.removeListener("message", handler);
                chosenProcessChild.kill();
            }

            chosenProcessChild.on("message", handler);
            chosenProcessChild.send("init");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}