import express, { Router } from "express"
import http from "http"
import database from "./database.js";
import { Readable, Transform } from "stream";

const app = express();
const routes = Router();

routes.route("/get").get(async (req, res) => {
    const readble = new Readable({
        read() {
            database.forEach(el => this.push(JSON.stringify(el)));
            this.push(null)
        }
    });

    readble
        .pipe(groupBy(50))
        .pipe(res)

})

app.use("/api", routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("server running at 3000");
})

function groupBy(sizeOfGroup) {
    let group = [];
    let sizeGroupIndicate = 0;
    return new Transform({
        transform(chunk, enc, cb) {
            if (sizeGroupIndicate % sizeOfGroup === 0 && sizeGroupIndicate !== 0) {
                this.push(JSON.stringify(group));
                group.length = 0;
                sizeGroupIndicate = 0;
            } else {
                group.push(JSON.parse(chunk.toString()));
                sizeGroupIndicate++;
            }
            cb();
        },

        flush(cb) {
            this.push(JSON.stringify(group));
            group = null;
            sizeGroupIndicate = null;
            cb();
        }
    });
}