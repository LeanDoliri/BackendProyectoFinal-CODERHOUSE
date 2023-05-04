import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ProductsDAOMongoDB from "../../models/dao/Products.DAO.js";
import CartDAOMongoDB from "../../models/dao/Cart.DAO.js";
import logger from "../../config/winston.js";

const productsApi = new ProductsDAOMongoDB();
const cartApi = new CartDAOMongoDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
  // ---- PRODUCTOS ----
  // carga de productos
  socket.on("getProducts", async () => {
    try {
      const productsDB = await getProducts();
      socket.emit("products", productsDB);
    } catch (error) {
      logger.info(error);
    }
  });

  // ---- CARRITO ----
  // agregar producto al carrito
  socket.on("addProduct", async (addingProduct) => {
    try {
      const cart = await getCart(addingProduct.userEmail);
      const product = await getProduct(addingProduct.productID);

      const productInCar = cart.items.find(p => p._id == addingProduct.productID);

      if (productInCar !== undefined) {
        productInCar.qty += 1;
        await cartApi.update(cart._id, { items: cart.items });

        socket.emit("addedProduct");
      } else {
        cart.items.push({...product._doc, qty: 1});
        await cartApi.update(cart._id, { items: cart.items });

        socket.emit("addedProduct");
      }
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

async function getCart(userEmail) {
  try {
    const cartsDB = await cartApi.getAll();
    const cart = cartsDB.find(cart => cart.email == userEmail);
    return cart;
  } catch (error) {
    logger.info(error);
  }
}

async function getProduct(productID) {
  try {
    const product = await productsApi.getById(productID);
    return product[0];
  } catch (error) {
    logger.info(error);
  }
}