import { MySqlDatabase } from "./database.js";
import { UserRepository } from "./repository.js";

const database = new MySqlDatabase({ connectionString: "mysql://Luiz:13012006@localhost/users" });
const poolsConnections = database.connect();
const repository = new UserRepository({ poolsConnections });

process.on("message", async () => {
    const data = await repository.find();
    process.send(data);
})
