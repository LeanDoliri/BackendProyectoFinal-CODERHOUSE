import { Router } from "express";
import { getCart } from "../controllers/cart.Controllers.js";

const cartWebRouter = new Router();

cartWebRouter.get("/cart", getCart);

export default cartWebRouter;