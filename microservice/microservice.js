import { loadSync } from "@grpc/proto-loader"
import grpc from "@grpc/grpc-js";

const server = new grpc.Server();
const serviceDefinitionProtoFile = loadSync("./microservice/microservice.proto");
const messageService = grpc.loadPackageDefinition(serviceDefinitionProtoFile).serviceProto.MessageService;

function sendMessage(call, callback) {
    const { message, userName } = call.request;
    console.log(`the message:[${message}] is send from ${userName}`);
    const response = {
        result: " message send successfully"
    }
    callback(null, response)
}

function getMessages(call, callback) {
    const chat = {
        messages: [
            {
                message: "oi tudo bem luiz?",
                userName: "nathalia"
            },
            {
                message: "oi tudo bem nathalia e voce?",
                userName: "luiz"
            },
            {
                message: "tudo otimo",
                userName: "nathalia"
            }
        ]
    }

    callback(null, chat)
}

server.addService(messageService.service, {
    sendMessage,
    getMessages
})


server.bindAsync("127.0.0.1:5451", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) throw err;
    console.log(`microservisse run at ${port}`);
})