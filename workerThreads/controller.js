import { parse } from "url";
import { Worker } from "worker_threads";

const worker = new Worker("./workerThreads/worker.js");

export class ImageController {
    async joinImages(req, res) {
        const { query: { image, background } } = parse(req.url, true)
        function handler(result) {
            worker.removeAllListeners("message");
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
        worker.on("message",handler);
        worker.postMessage({ image,background })   
    }
}

