import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ProductsDAOMongoDB from "../../models/dao/Products.DAO.js";
import logger from "../../config/winston.js";

const productsApi = new ProductsDAOMongoDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
  // ---- PRODUCTOS ----
  // carga de productos
  socket.on("getProductsAdmin", async () => {
    try {
      const productsDB = await getProducts();
      socket.emit("products", productsDB);
    } catch (error) {
      logger.info(error);
    }
  });
}

async function getProducts() {
  try {
    const productsDB = await productsApi.getAll();
    return productsDB;
  } catch (error) {
    logger.info(error);
  }
}