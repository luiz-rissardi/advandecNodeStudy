import { initialize } from "./cluster.js";
import { getconnectToMongo, getconnectToMysql } from "./db.js";
import cliProgress from "cli-progress";
import { Readable, Writable } from "stream"

const MAX_PROCESSES = 3;
const MAX_PER_PAGE = 2000;
const TASK_BACKGROUND = "./childProcessAdvanced/task.js"

const mongoDb = await getconnectToMongo();
const sqlDb = await getconnectToMysql();

const totalItens = await mongoDb.users.countDocuments();
let totalProcesed = 0;

const progressBar = new cliProgress.SingleBar({
    format: 'progress [{bar}] {percentage}% | {value}/{total} | {duration}s',
    clearOnComplete: false,
}, cliProgress.Presets.shades_classic);

progressBar.start(totalItens, 0);


const processes = initialize({
    taskBackground: TASK_BACKGROUND,
    clusterSize: MAX_PROCESSES,
    onMessage: async (message) => {
        try {
            progressBar.increment(1);
            if (++totalProcesed !== totalItens) return;
            processes.killAll();
            progressBar.stop();
            const [countItensInMysql] = await sqlDb.query("SELECT * from usuario");
            console.log(`total itens in mongo: ${totalItens}`);
            console.log(`total itens in mysql: ${countItensInMysql.length}`);
        } catch (error) {
            console.log(error);
        }
    }
})

let maxLimit = 3
async function* getPagedData(maxPerPage, page = 0,limit = 0) {
    const data = mongoDb.users.find().skip(page).limit(maxPerPage).stream();

    Readable.toWeb(new Readable({
        objectMode: true,
        read() {
            data.on("data", (data) => {
                this.push(JSON.stringify(data))
            })
        }
    }))
        .pipeTo(new WritableStream({

            write(chunk, controller) {
                const user = JSON.parse(chunk);
                processes.sendToChild(user)
            }
        }))

    if (limit > maxLimit) {
        return;
    }

    yield* getPagedData(maxPerPage, page += maxPerPage,limit += 1)


}

getPagedData(MAX_PER_PAGE).next()


