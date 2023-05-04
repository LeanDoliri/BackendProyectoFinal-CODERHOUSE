import { Router } from "express";
import { getChat } from "../controllers/chat.Controllers.js";

const chatWebRouter = new Router();

chatWebRouter.get("/chat", getChat);

export default chatWebRouter;