import { parentPort } from "worker_threads"
import sharp from "sharp";


parentPort.on("message", async ([image, size]) => {
    try {
        const processedImage = await sharp(image)
            .resize(size)
            .toBuffer();
        parentPort.postMessage({ processedImage, error: null });
    } catch (error) {
        parentPort.postMessage({ processedImage: null, error });
    }
})