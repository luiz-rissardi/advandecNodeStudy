import { createServer } from "http";
import express, { Router } from "express";
import { UserController } from "./controller.js";

export function runServer() {
  const app = express();
  const server = createServer(app);

  server
    .listen(4000)
    .once("listening", () => {
      console.log(`server is running at port ${server.address().port}`);
      const controller = initDependecies();
      const routes = initRoutes(controller)
      app.use(routes)
    });
}


function initRoutes(controller) {
  const routes = Router();
  routes.route("/users").get((req, res) => {
    controller.findAll(req, res);
  })

  return routes;
}


function initDependecies() {
  // const database = new MySqlDatabase({connectionString:"mysql://Luiz:13012006@localhost/users"});
  // const connection = database.connect();
  // const repository = new UserRepository(({poolsConnections:connection}))
  const controller = new UserController();
  return controller;
}