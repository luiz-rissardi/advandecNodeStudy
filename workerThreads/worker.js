import sharp from "sharp";
import { parentPort, Worker } from "worker_threads";

const subWorker = new Worker("./workerThreads/subWorker.js");
const subWorker1 = new Worker("./workerThreads/subWorker.js");

function initWorker(worker, image, size) {
    return new Promise((resolve, reject) => {
        const messageHandler = (result) => {
            worker.removeListener("message",messageHandler);
            worker.removeListener("message",errorHandler);
            resolve(result);
        };

        const errorHandler = (error) => {
            worker.removeListener("message",messageHandler);
            worker.removeListener("message",errorHandler);
            reject(error);
        };

        worker.on("message", messageHandler);
        worker.on("error", errorHandler);
        worker.postMessage([image, size]);
    });
}

async function startProcess(image, background) {
    try {
        const [mainImage, backgroundImage] = await Promise.all([
            initWorker(subWorker, image, 300),
            initWorker(subWorker1, background, 800)
        ])

        if (!mainImage.error && !backgroundImage.error) {
            const finalImage = await sharp(backgroundImage.processedImage)
                .composite([
                    {
                        input: mainImage.processedImage,
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
    startProcess(image, background);
});