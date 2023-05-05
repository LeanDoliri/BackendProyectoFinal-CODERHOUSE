import { Router } from "express";
import { getAddProduct, getAdminChat, getAdminHome, getProfile, getUpdate, postAddProduct, postUpdate } from "../controllers/admin.Controllers.js";
import { apiProducts } from "../api/products.js";

const adminWebRouter = new Router();

adminWebRouter.use('/apiProducts', apiProducts);

adminWebRouter.get("/home", getAdminHome);

adminWebRouter.get("/update/:id", getUpdate);
adminWebRouter.post("/update/:id", postUpdate);

adminWebRouter.get("/add-product", getAddProduct);
adminWebRouter.post("/add-product", postAddProduct);

adminWebRouter.get("/chat", getAdminChat);
adminWebRouter.get("/profile", getProfile);

export default adminWebRouter;