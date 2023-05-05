import { Router } from "express";
import { getAddProduct, getAdminChat, getAdminHome, getProfile } from "../controllers/admin.Controllers.js";
import { apiProducts } from "../api/products.js";

const adminWebRouter = new Router();

adminWebRouter.use('/admin/apiProducts', apiProducts);

adminWebRouter.get("/home", getAdminHome);
adminWebRouter.get("/add-product", getAddProduct);
adminWebRouter.get("/chat", getAdminChat);
adminWebRouter.get("/profile", getProfile);


export default adminWebRouter;