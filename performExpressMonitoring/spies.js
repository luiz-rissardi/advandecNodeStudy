import { performance, PerformanceObserver } from "perf_hooks"
import { AsyncLocalStorage } from "async_hooks";
import { appendFile } from "fs/promises";
import { randomUUID } from "crypto";

const asyncLocalStorage = new AsyncLocalStorage();

const verbs = ["GET","POST"];

function middleWareMonitoring(req, res, next){
    if (verbs.includes(req.method)) {
        const customerId = req.headers["client-key"];
        const replcadedId = customerId.slice(0,3);
        const data = { customerId:replcadedId, requestId: randomUUID() };
        res.setHeader('x-request-id', data.requestId);
        req.use = data;
        asyncLocalStorage.enterWith(data);
        logRequest("start");
        res.on("finish", () => {
            logRequest("finish");
        })
    }
    next();
}

function logRequest(msg) {
    const { customerId, requestId } = asyncLocalStorage.getStore();
    const start_mark = `START => client-id:${customerId} to request-id:${requestId}`
    const end_mark = `END => client-id:${customerId} to request-id:${requestId}`;

    if (msg == "start") {
        performance.mark(start_mark);
    }

    if (msg == "finish") {
        performance.mark(end_mark);
        performance.measure(`client ${customerId} send request ${requestId}`, start_mark, end_mark);
    }
}

const observer = new PerformanceObserver((mark) => {
    const [item] = mark.getEntries();
    performance.clearMarks(item.name);
    appendFile("logger.log", `name: ${item.name},duration: ${item.duration}\n`)
})

observer.observe({ entryTypes: ["measure"] });

export { middleWareMonitoring }