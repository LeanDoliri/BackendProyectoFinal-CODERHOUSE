import { Router } from "express";
import { getAdmin } from "../controllers/admin.Controllers.js";
import { apiProducts } from "../api/products.js";

const adminWebRouter = new Router();

adminWebRouter.use('/apiProducts', apiProducts);

adminWebRouter.get("/admin-home", getAdmin);

export default adminWebRouter;