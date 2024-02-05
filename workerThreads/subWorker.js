import { parentPort } from "worker_threads"
import sharp from "sharp";
import axios from "axios";

async function dowloadFile(url) {
    return axios(url, {
        responseType: "arraybuffer"
    });
}

parentPort.on("message", async ([image, size]) => {
    try {
        const bufferImage = await dowloadFile(image);
        const processedImage = await sharp(bufferImage.data)
            .resize(size)
            .toBuffer();
        parentPort.postMessage({ processedImage, error: null, id: size });
    } catch (error) {
        parentPort.postMessage({ processedImage: null, error, id: null });
    }
})