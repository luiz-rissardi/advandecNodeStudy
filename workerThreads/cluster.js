import cluster from "cluster";
import { cpus } from "os";

if(cluster.isPrimary){
    for(let i=0;i<cpus().length;i++){
        cluster.fork();
    }

    cluster.on("exit",(error)=>{
        console.log("um erro aconteceu!");
        cluster.fork();
    })

}else{
    import("./index.js");
}
