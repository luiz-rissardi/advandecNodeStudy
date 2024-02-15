import { Worker } from "worker_threads";


const worker = new Worker("./worker/teste.js")

export class UserController {

    async findAll(req, res) {
        try {
            function handler(result) {
                worker.removeAllListeners("message");
                if (!result?.error) {
                    res.write(String(result));
                } else {
                    res.writeHead(500);
                }
                res.end()
            }

            worker.on("message",handler)
            worker.postMessage(100);


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}