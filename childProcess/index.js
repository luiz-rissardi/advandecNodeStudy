import { fork } from "child_process";
import getAllData from "./database.js";
import { start } from "repl";

const observer = new PerformanceObserver((mark)=>{
    const [item] = mark.getEntries();
    performance.clearMarks(item.name);
    console.log(item);
})

observer.observe({ entryTypes: ["measure"] });

const inicio = performance.now();
const child = fork("./childProcess/database.js");
child.send("inicialize");
const fim = performance.now()
console.log(fim - inicio);



child.on("message",(msg)=>{
    console.log("mensagem recebida:", msg);
    child.kill();
})


function joinNames(data) {
    return data.map(user => {
        return {
            id: user.id,
            idade: user.idade,
            cidade: user.cidade,
            fullName: user.nome.toUpperCase() + " " + user.sobrenome.toUpperCase()
        }
    })
}

