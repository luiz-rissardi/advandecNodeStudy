import http from "http";
import { Readable, Writable, Transform } from "stream";
import event from "events";

function* generator(items) {
    for (const item of items) {
        yield item;
    }
    return;
}

function readble(chunk) {
    console.log(chunk);
}

const data = [
    1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5,
    6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3,
    4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1,
    2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,
];

const read = new Readable({
    read() {
        for (const item of data) {
            this.push(String(item));
        }
        this.push(null);
    },
});

const Event = new event();

function master(date) {
    const teste = Date.now
    return teste
}

const server = http.createServer((req, res) => {
    res.write("teste");
    Event.on("data", function (date) {
        const teste = date + 5
        return teste
    });
    Event.emit("data", Date.now());
    
    res.end();
});

server.listen(3000, () => {
    console.log("server running in 3000");
});
