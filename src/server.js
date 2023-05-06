import express from "express";
import session from "express-session";
import compression from "compression";
import cors from "cors";
import MongoStore from "connect-mongo";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import productsWs from "./routes/ws/home.js";
import cartWs from "./routes/ws/cart.js";
import chatWs from "./routes/ws/chat.js";
import adminHomeWs from "./routes/ws/admin-home.js";
import adminChatWs from "./routes/ws/admin-chat.js";

import config from "./config/config.js";
import authWebRouter from "./routes/auth.js";
import homeWebRouter from "./routes/home.js";
import profileWebRouter from "./routes/profile.js";
import cartWebRouter from "./routes/cart.js";
import adimnWebRouter from "./routes/admin.js";
import chatWebRouter from "./routes/chat.js";

function createServer() {
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new Socket(httpServer);

  io.on("connection", async (socket) => {
    productsWs(socket);
    cartWs(socket);
    chatWs(socket);
    adminHomeWs(socket);
    adminChatWs(socket);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use(cors());
  app.use(compression());

  app.set("view engine", "ejs");
  app.set("views", "views");

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongoRemote.cnxStr,
        mongoOptions: config.mongoRemote.options,
      }),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );

  /*----------- rutas -----------*/
  app.use(authWebRouter);
  app.use(homeWebRouter);
  app.use(cartWebRouter);
  app.use(profileWebRouter);
  app.use(chatWebRouter);
  app.use("/admin", adimnWebRouter);

  return {
    listen: (port) =>
      new Promise((resolve, reject) => {
        const connectedServer = httpServer.listen(port, () => {
          resolve(connectedServer);
        });
        connectedServer.on("error", (error) => {
          reject(error);
        });
      }),
  };
}

export { createServer };
