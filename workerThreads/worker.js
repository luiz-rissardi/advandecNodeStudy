import sharp from "sharp";
import { parentPort, Worker } from "worker_threads";

const subWorker = new Worker("./workerThreads/subWorker.js");
const subWorker1 = new Worker("./workerThreads/subWorker.js");

function initWorker(worker, image, size) {
    return new Promise((resolve, reject) => {
        const messageHandler = (result) => {
            resolve(result);
        };

        const errorHandler = (error) => {
            reject(error);
        };
   
        worker.once("message", messageHandler);
        worker.once("error", errorHandler);
        worker.postMessage([image, size]);
    });
}

async function startProcess(image, background) {
    try {
        const [result1, result2] = await Promise.all([
            initWorker(subWorker, image, 300),
            initWorker(subWorker1, background, 800)
        ])

        if (!result1.error && !result2.error) {
            const finalImage = await sharp(result2.processedImage)
                .composite([
                    {
                        input: result1.processedImage,
                        gravity: sharp.gravity.south
                    }
                ])
                .toBuffer();

            parentPort.postMessage(`<img src="data:image/jpeg;base64,${finalImage.toString("base64")}" />`);
        } else {
            parentPort.postMessage({ error: true });
        }
    } catch (error) {
        parentPort.postMessage({ error: true });
    }
}

parentPort.on("message", (data) => {
    const { image, background } = data;
    startProcess(image, background)
});
