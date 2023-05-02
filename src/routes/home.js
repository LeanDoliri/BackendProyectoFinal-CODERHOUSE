import { Router } from "express";
import { getHome } from "../controllers/home.Controllers.js";

const homeWebRouter = new Router();

homeWebRouter.get("/home", getHome);

export default homeWebRouter;