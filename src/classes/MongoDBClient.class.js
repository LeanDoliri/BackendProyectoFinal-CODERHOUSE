import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/winston.js";
import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";

class MongoDBClient extends DBClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }

    async connect() {
        try {
            mongoose.set('strictQuery', false);
            await this.client.connect(config.mongoRemote.cnxStr, config.mongoRemote.options);
            this.connected = true;

            logger.info("Base de datos conectada");
        } catch (error) {
            const objErr = new CustomError(500, "Error al conectarse con MongoDB", error);
            logger.error(objErr);
            throw objErr;
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close();
            this.connected = false;
            logger.info("Base de datos desconectada");
        } catch (error) {
            const objErr = new CustomError(500, "Error al desconectarse a mongodb", error);
            logger.error(objErr);
            throw objErr;
        }
    }
}

export default MongoDBClient;