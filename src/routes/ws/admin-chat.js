import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import MessagesDAOMongoDB from "../../models/dao/Messages.DAO.js"

import logger from "../../config/winston.js";

const messagesApi = new MessagesDAOMongoDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
    // ---- CHAT ----
    socket.on("usersChatsHistory", async () => {
        try {
            const usersChats = await messagesApi.getAll();

            socket.emit("updateChatHistory", usersChats);
        } catch (error) {
            logger.info(error);
        }
    });

    socket.on("newMessageAdmin", async (data) => {
        try {
            const chat = await getChat(data.userEmail);
            chat.messages.push(data.message);
            await messagesApi.update(chat._id, { messages: chat.messages });

            const usersChats = await messagesApi.getAll();

            socket.emit("updateChatHistory", usersChats);
        } catch (error) {
            logger.info(error);
        }
    });
}

async function getChat(userEmail) {
    try {
        const messagesDB = await messagesApi.getAll();
        const chat = messagesDB.find(chat => chat.email == userEmail);
        return chat;
    } catch (error) {
        logger.info(error);
    }
}