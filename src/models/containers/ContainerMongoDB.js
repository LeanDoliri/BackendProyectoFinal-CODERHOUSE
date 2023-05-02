import CustomError from "../../classes/CustomError.class.js";
import MongoDBClient from "../../classes/MongoDBClient.class.js"
import logger from "../../config/winston.js";

class ContainerMongoDB {
  constructor(model) {
    this.coleccion = model;
    this.conn = new MongoDBClient();
  }

  async getById(id) {
    try {
      await this.conn.connect();

      const elem = await this.coleccion.find({ _id: id });
      return elem;
    } catch (error) {
      const objErr = new CustomError(500, 'Error getById()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }

  async getAll() {
    try {
      await this.conn.connect();

      const elements = await this.coleccion.find({});
      return elements;
    } catch (error) {
      const objErr = new CustomError(500, 'Error getAll()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }

  async save(elem) {
    try {
      await this.conn.connect();

      const elemSave = new this.coleccion(elem);
      const savedElem = await elemSave.save();
      return savedElem;
    } catch (error) {
      const objErr = new CustomError(500, 'Error save()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }

  async update(id, newElem) {
    try {
      await this.conn.connect();
      await this.coleccion.updateOne({_id: id}, { $set: newElem });
    } catch (error) {
      const objErr = new CustomError(500, 'Error update()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }

  async delete(id) {
    try {
      await this.conn.connect();

      await this.coleccion.deleteOne({ _id: id });
      const elementos = await this.coleccion.find({});
      return elementos;
    } catch (error) {
      const objErr = new CustomError(500, 'Error delete()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }

  async deleteAll() {
    try {
      await this.conn.connect();

      await this.coleccion.deleteMany({});
      const elementos = await this.coleccion.find({});
      return elementos;
    } catch (error) {
      const objErr = new CustomError(500, 'Error deleteAll()', error);
      logger.error(objErr);
      throw objErr;
    } finally {
      this.conn.disconnect();
    }
  }
}

export default ContainerMongoDB;
