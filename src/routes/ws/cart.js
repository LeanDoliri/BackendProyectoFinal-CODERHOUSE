import express from "express";
import moment from "moment";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import OrdersDAOMongoDB from "../../models/dao/Orders.DAO.js";
import CartDAOMongoDB from "../../models/dao/Cart.DAO.js";
import UserDAOMongoDB from "../../models/dao/User.DAO.js";

import { sendNewPurchaseEmail } from "../../utils/nodemailer/nodemailer.js";
import logger from "../../config/winston.js";

const ordersApi = new OrdersDAOMongoDB();
const cartApi = new CartDAOMongoDB();
const usersApi = new UserDAOMongoDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
  // ---- CARRITO ----
  // carga de productos
  socket.on("getItemsCart", async (userEmail) => {
    try {
      const cart = await getCart(userEmail);

      socket.emit("itemsCart", cart.items);
    } catch (error) {
      logger.info(error);
    }
  });

  // eliminar producto del carrito
  socket.on("deleteProduct", async (deleteProduct) => {
    try {
      const cart = await getCart(deleteProduct.userEmail);
      const newCartItems = cart.items.filter(item => item._id != deleteProduct.productID);

      await cartApi.update(cart._id, {items: newCartItems});
      socket.emit("itemsCart", newCartItems);
    } catch (error) {
      logger.info(error);
    }
  });

  // realizar compra
  socket.on("makePruchase", async (userEmail) => {
    try {
      const cart = await getCart(userEmail);
      const client = await getClient(userEmail);
      const ordersDB = await ordersApi.getAll();

      const purchase = {
        numOfOrder: ordersDB.length + 1,
        email: userEmail,
        adress: client.adress,
        date: moment().format('DD/MM/YYYY, HH:mm:ss'),
        items: cart.items,
      };

      await ordersApi.save(purchase);
      sendNewPurchaseEmail(client, purchase);

      await cartApi.update(cart._id, {items: []});
      socket.emit("purchaseMade");
    } catch (error) {
      logger.info(error);
    }
  });
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

async function getClient(userEmail) {
  try {
    const usersDB = await usersApi.getAll();
    const client = usersDB.filter((user) => user.email == userEmail);
    return client[0];
  } catch (error) {
    logger.info(error);
  }
}
