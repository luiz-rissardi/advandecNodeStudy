import { readFile } from "fs";
import path, { resolve } from  "path";

readFile(resolve("") + "/"+ "logger.log",(err,data)=>{
    console.log(data.toString());
});