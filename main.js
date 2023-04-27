import cluster from "cluster";
import { cpus } from "os";

import { createServer } from "./src/server.js";
import config from "./src/config/config.js";

const app = createServer();

if (config.mode == "cluster" && cluster.isPrimary) {
    const numCPUs = cpus().length;
    console.log(`Número de procesadores: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log("Worker", worker.process.pid, "died", new Date().toLocaleString());
        cluster.fork();
    });
} else {
    process.on("exit", (code) => {
        console.log("Salida con código de error: " + code);
    });

    try {
        const connectedServer = await app.listen(config.PORT);
        console.log(`proceso #${process.pid} escuchando en el puerto ${connectedServer.address().port}`);
    } catch (error) {
        console.log(`Error en servidor ${error}`);
    }
}