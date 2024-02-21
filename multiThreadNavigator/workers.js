import Service from "./service.js"

const service = new Service();

postMessage({eventType:"alive"});

onmessage = ({ data }) => {
    const { file, searchQuery } = data;

    service.processFile({
        query: searchQuery,
        file,
        setupProgress: (total) => {
            postMessage({ eventType: 'progress', total })
        }
    })
}