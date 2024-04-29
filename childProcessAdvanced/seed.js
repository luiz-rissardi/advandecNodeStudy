import { getconnectToMongo } from "./db.js";
import { faker } from "@faker-js/faker";
import { randomUUID} from "crypto" 

async function seedMongo() {
    const { client, users } = await getconnectToMongo();
    await users.deleteMany({});

    const usuarios = [];

    for (let i = 0;i<=10_000;i++){
        usuarios.push({
            id:randomUUID(),
            userName:faker.person.firstName(),
            lastName:faker.person.lastName(),
            idade:faker.number.int(15,60)
        })
    }

    await users.insertMany(usuarios);
    await client.close();
}

seedMongo()