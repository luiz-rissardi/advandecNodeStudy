
import { appendFile } from 'fs/promises'
import { PerformanceObserver, performance } from 'perf_hooks'
import { AsyncLocalStorage } from 'async_hooks'
import { randomUUID } from 'crypto'
import Http from 'http'

const asyncLocalStorage = new AsyncLocalStorage();

const obs = new PerformanceObserver((items) => {
    const [entry] = items.getEntries()
    const item = entry
    console.log(item);
    performance.clearMarks(item.name);
    appendFile("logger.log", `name: ${item.name},duration: ${item.duration}\n`)
});

obs.observe({ entryTypes: ['measure'] });


function logRequest(msg) {
    const store = asyncLocalStorage.getStore();
    const { requestId, customerId } = store

    const labelStart = `start-${customerId}-${requestId}`
    const labelEnd = `end-${customerId}-${requestId}`

    if (msg === "start") {
        performance.mark(labelStart)
    }

    if (msg === "finish") {
        performance.mark(labelEnd);
        performance.measure(`myapp-${customerId}-${requestId}`, labelStart, labelEnd);
    }
}



function start() {
    const emit = Http.Server.prototype.emit;
    Http.Server.prototype.emit = function (type, req, res) {
        if (type !== 'request') {
            return emit.apply(this, arguments);
        }

        const customerId = req.headers['x-app-id'] || 1
        const data = { customerId, requestId: randomUUID() }
        res.setHeader('x-request-id', data.requestId)
        req.user = data
        asyncLocalStorage.enterWith(data)

        logRequest('start');
        res.on('finish', () => logRequest('finish'))
        return emit.apply(this, arguments);
    };

}
export { start }