import { Worker } from "worker_threads";


const MAX_WORKERS = 70;
const workers = new Map();

for (let i=0;i<MAX_WORKERS;i++) {
    const worker = new Worker("./worker/teste.js",{
        workerData:{ number:100 }
    })
    workers.set(worker.threadId,worker);
}

function loadBalanceWoker(arr=[],index=0){
    return function() {
        if(index >= arr.length) index=0;
        return arr[index ++];
    }
}

const getWorker = loadBalanceWoker([...workers.values()]);


export class UserController {

    async findAll(req, res) {
        try {

            const worker = getWorker();
            
            worker.on("message",(value) =>{
                res.write(String(value));
                res.end();
            })

            worker.on("error",(err)=>{
                console.log("errorr =>",err);
            })
            worker.postMessage("init");

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}



function* fibonacci(n) {
    if (n <= 1) {
        yield n;
    } else {
        yield* fibonacci(n - 1);
        yield n;
    }
}
