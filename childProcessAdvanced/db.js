import { MongoClient } from "mongodb";
import { createPool } from "mysql2";

export async function getconnectToMongo() {
    try {
        const client = new MongoClient("mongodb+srv://rissardiluiz2006:6M83yV9JKkrZfTx1@cluster0.lcyx9cc.mongodb.net/");
        await client.connect()
        const collection = client.db("festajunina").collection("users");
        return {
            users: collection,
            client
        }
    } catch (error) {
        console.log("erro ao conectar ao mongo");
    }
}

export async function getconnectToMysql(){
    try {
        const pool = await connectToMysql();
        const connection = await pool.promise().getConnection();
        return connection
    } catch (error) {
        console.log("erro ao pegar conexão");
    }
}

function connectToMysql(){
    try {
        const pool = new createPool("mysql://root:13012006@localhost/users");
        return pool
    } catch (error) {
        console.log("erro ao se conectar com o mysql");
    }
}