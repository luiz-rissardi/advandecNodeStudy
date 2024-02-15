import { parentPort } from "worker_threads";

function fibonacci(n) {
    if(n == 1) return 1;

    let data = 0;
    for(let i=1;i<=n;i++){
        data += i;
    }
    return data
}

parentPort.on("message", (number) => {
    let result = fibonacci(number)
    parentPort.postMessage(result);
})