export default class Service {

    processFile({ query, file, setupProgress }) {
        const linesLength = { counter: 0 };
        const progressFn = this.#setupProgressBar(file.size, setupProgress);
        file
            .stream()
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(this.#csvToJson(progressFn,linesLength))
            .pipeTo(new WritableStream({
                write(chunk){
                    // console.log(chunk);
                }
            }))

    }

    #setupProgressBar(totalBytes, setupProgress) {
        let totalUploaded = 0
        setupProgress(0)
        return (chunkLength) => {
            totalUploaded += chunkLength
            const total = 100 / totalBytes * totalUploaded
            setupProgress(total)
        }
    }

    #csvToJson(progressFn, linesLength ) {
        let columns = [];
        return new TransformStream({
            
            transform(chunk, controller) {
                progressFn(chunk.length);
                const lines = chunk.split('\n')
                linesLength.counter += lines.length
                if (!columns.length) {
                    const firstLine = lines.shift()
                    columns = firstLine.split(',')
                    linesLength.counter--
                }

                for (let line of lines) {
                    if(!line.length) continue;
                    const curretLine = line.split(",");
                    const currentObjetc = {};

                    for(let index in curretLine){
                        const columnLine = curretLine[index];
                        currentObjetc[columns[index]] = columnLine.trimEnd();
                    }
                    controller.enqueue(currentObjetc)
                }
            }
        })
        
    }
}