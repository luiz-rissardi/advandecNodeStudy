import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

const worker = new Worker("workers.js",{type:"module"});

Controller.init({
    service:new Service(),
    view:new View(),
    worker
})