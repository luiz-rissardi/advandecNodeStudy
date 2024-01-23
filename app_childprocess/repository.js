

export class UserRepository {
    #poolsConnections
    constructor({ poolsConnections }) {
        this.#poolsConnections = poolsConnections;
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.#poolsConnections.getConnection((err, connection) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(connection)
                });
            } catch (error) {
                reject("não foi possivel se conectar")
            }
        })
    }

    disconect() {
        this.#poolsConnections.end();
    }

    async find() {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await this.connect();
                connection.query("select * from usuario", (err, data) => {
                    if (err) reject(err);
                    resolve(data)
                });
                connection.release();
            } catch (error) {
                reject(error);
            }
        })
    }
}

//para pools
// return new Promise(async (resolve,reject)=>{
//     try {
//         const connection = await this.connect();
//         connection.query("select * from users",(err,data)=>{
//             if(err) reject(err);
//             resolve(data)
//         });
//         connection.release();
//     } catch (error) {
//         reject(error);
//     }
// })
