import { Session } from "inspector/promises"; // Correto
import express, { Router } from "express";
import { createServer } from "http";
import { Readable } from "stream";
import { createWriteStream } from "fs";


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
            console.log('stopping CPU Profiling');
            
            const { profile } = await _session.post('Profiler.stop')
            createWriteStream('./cpu-profile.cpuprofile').write(JSON.stringify(profile));

            _session.disconnect()
            process.exit(0);
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

    Readable.from(result.toString()).pipe(res);
});

app.use(router);

const { start, stop } = cpuProfiling();

server.listen(3000).on("listening", async () => {
    start();
    console.log("Server is running at http://localhost:3000");
});


// Captura sinais do sistema para parar o profiler
["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, async () => {
        console.log(`Recebido sinal ${signal}. Parando o servidor...`);
        await stop(); // Parada assíncrona do profiler
    });
});

// Função para cálculo de fatorial
function fatorial(n) {
    if (n < 0) {
        throw new Error("Fatorial não definido para números negativos.");
    }
    return n === 0 ? 1 : n * fatorial(n - 1);
}


/**
 * notações de testes, usar respostas sob demanda como Reable.from(result.toString()).pipe(res)
 * faz o servidor responder mais clientes, mesmo os dados sendo apenas 1 numero ou poucos dados
 * 
 * usar res.write, ou res como writable***
 */