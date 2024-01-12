
import cluster from "cluster";
import { cpus } from "os";

const numOfCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Processo principal criado: ${process.pid}`);

  for (let i = 0; i < numOfCPUs; i++) {
    const port = 8999 + i;
    const worker = cluster.fork({port});
    console.log(`Criando processo filho: ${worker.process.pid}`);
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`iniciando outro processo ${process.pid}`);
    cluster.fork();
  });

  cluster.on("disconnect",(worker)=>{
    console.log(`disconnect => ${worker}`);
  })
} else {
  await import("./testAutocannon/withStream/index.js")
}
