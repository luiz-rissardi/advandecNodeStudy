import { createPool } from "mysql2";

function connect() {
    return new Promise((resolve,reject)=>{
        createPool("mysql://Luiz:13012006@localhost/users").getConnection((err,connection)=>{
            if(err) reject("não foi possivel se conectar com o banco de dados");
            resolve(connection);
        })
    })
}

async function getAllData() {
    const connection = await connect();
    const [result] = await connection.promise().query("select * from users");
    connection.release();
    return result;
}

export default getAllData

process.on("message",()=>{
    getAllData()
        .then(data => {
            process.send(data)
        })
})