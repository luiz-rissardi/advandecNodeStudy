import { fork } from "child_process";

function roundRobin(arr = [], index = 0) {
    return function () {
        if (arr.length >= index) index = 0;
        return arr[index];
    }
}

function initializeCluster({ taskBackground, clusterSize, onMessage }) {
    const processes = new Map();

    for (let index = 0; index < clusterSize; index++) {
        const child = fork(taskBackground);

        child.on('exit', () => {
            processes.delete(child.pid)
        })

        child.on('error', error => {
            process.exit(1)
        })

        child.on('message', (message) => {
            if (message === 'item done') {
                onMessage(message)
                child.send("end")
            }
        })

        processes.set(child.pid, child);

        return {
            getProcess: roundRobin([...processes.values()]),
            killAll: () => {
                processes.forEach(child => child.kill())
            }
        }
    }
}

export function initialize({ taskBackground, clusterSize, onMessage }) {
    const { killAll, getProcess } = initializeCluster({ taskBackground, clusterSize, onMessage });

    function sendToChild(message){
        const child = getProcess();
        // console.log(child);
        child.send(message);
    }

    return {
        killAll: killAll.bind(this),
        sendToChild: sendToChild.bind(this)
    }
}