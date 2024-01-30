import { parentPort, workerData } from "worker_threads";

function fibonacci(n) {
    if(n == 1) return 1;

    let data = 0;
    for(let i=1;i<=n;i++){
        data += i;
    }
    return data
}

parentPort.on("message", () => {
    const { number } = workerData;
    let result = fibonacci(number)
    parentPort.postMessage(result);
})