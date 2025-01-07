import express, { Router } from "express";
import { createServer } from "http"
import { loadSync } from "@grpc/proto-loader"
import grpc from "@grpc/grpc-js";

const serviceDefinitionProtoFile = loadSync("./microservice/microservice.proto");
const messageServiceProto = grpc.loadPackageDefinition(serviceDefinitionProtoFile).serviceProto.MessageService;
const client = await new messageServiceProto("127.0.0.1:5451", grpc.credentials.createInsecure());

const app = express();
const server = createServer(app);

const routes = Router();

routes.route("/message/:chatId").get((req, res) => {
    try {
        const { chatId } = req.params;
        client.getMessages({ chatId }, (error, response) => {
            if (error) {
                console.error(error);
            }
            res.json(response);
        });
    } catch (error) {
        console.log("error");
    }
})

app.use(routes)

server.listen(3000)
    .on("listening", () => {
        console.log("server is running ate 3000s");
    })

