import { createPool, createConnection } from "mysql2";

export class MySqlDatabase {
    #connectionString;
    #connection
    constructor({ connectionString }) {
        this.#connectionString = connectionString;
    }

    connect() {
        if (this.#connection == null) {
            this.#connection = createPool({
                connectionLimit: 10, // número máximo de conexões no pool
                host: 'localhost',
                user: 'Luiz',
                password: '13012006',
                database: 'users',
            })

            return this.#connection;
        }
        return this.#connection;
    }
}