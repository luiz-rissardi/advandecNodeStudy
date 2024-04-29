import { getconnectToMysql } from "./db.js";
const connection = await getconnectToMysql();

process.on("message", (item) => {
    if(item === "end"){
        connection.release();
        return;
    }

    connection.query("INSERT INTO usuario VALUES(?,?,?,?)", [
        item.id,
        item.userName,
        item.lastName,
        item.idade
    ]).then((result) => {
        process.send("item done");
    }).catch((err) => {
        console.log(err);
    });
})