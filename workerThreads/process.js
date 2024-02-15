import { Worker } from 'worker_threads';
import axios from "axios"

const worker = new Worker("./workerThreads/worker.js");

function downloadImage(url) {
    return axios(url, {
        responseType: "arraybuffer"
    })
}

async function processImages(image, background) {
    try {
        const [imageBuffer, backgroundBuffer] = await Promise.all([
            downloadImage(image),
            downloadImage(background)
        ])

        worker.postMessage(
            {
                image: imageBuffer.data,
                background: backgroundBuffer.data
            })

        worker.on("message",(data)=>{
            process.send(data)
        })


    } catch (error) {
        console.log(error);
        process.send({ error: true });
    }
}

process.on("message", ({ image, background }) => {
    processImages(image, background)
})