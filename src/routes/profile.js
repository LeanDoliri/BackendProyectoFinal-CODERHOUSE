import { Router } from "express";
import { getProfile } from "../controllers/profile.Controllers.js";

const profileWebRouter = new Router();

profileWebRouter.get("/profile", getProfile);

export default profileWebRouter;