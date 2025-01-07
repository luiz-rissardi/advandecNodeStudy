import { Session } from "inspector/promises"; // Correto
import express, { Router } from "express";
import { createServer } from "http";
import { writeFile } from "fs/promises";


function cpuProfiling() {
    let _session
    return {
        async start() {
            _session = new Session()
            _session.connect()
            
            await _session.post('Profiler.enable')
            await _session.post('Profiler.start')
            console.log('started CPU Profiling')
        },
        async stop() {
            console.log('stopping CPU Profiling')
            const { profile } = await _session.post('Profiler.stop')
            const profileName = `cpu-profile-${Date.now()}.cpuprofile`
            await writeFile(profileName, JSON.stringify(profile));
            _session.disconnect()
        },
    }
}


const app = express();
const server = createServer(app);

const router = Router();

router.route("/teste/:n").get((req, res) => {
    const { n } = req.params;

    const parsedN = parseInt(n);
    if (isNaN(parsedN)) {
        return res.status(400).json({ error: "O parâmetro deve ser um número inteiro." });
    }

    const result = fatorial(parsedN);
    res.json({ result });
});

app.use(router);

server.listen(3000).on("listening", async () => {
    console.log("Server is running at http://localhost:3000");
});

const { start, stop } = cpuProfiling();
start();

// Captura sinais do sistema para parar o profiler
["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, async () => {
        console.log(`Recebido sinal ${signal}. Parando o servidor...`);
        await stop(); // Parada assíncrona do profiler
        process.exit(0);
    });
});

// Função para cálculo de fatorial
function fatorial(n) {
    if (n < 0) {
        throw new Error("Fatorial não definido para números negativos.");
    }
    return n === 0 ? 1 : n * fatorial(n - 1);
}
