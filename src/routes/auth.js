import { Router } from "express";

import { uploader } from "../utils/multer/multer.js";
import { authenticate } from "../utils/passport/passport.js";
import { getLogin, getLoginError, getLogout, getSignin, postSignin } from "../controllers/auth.Controllers.js";

const authWebRouter = new Router();

/*----------- rutas -----------*/
/*----- login -----*/
authWebRouter.get("/", (req, res) => res.redirect("login"));

authWebRouter.get("/login", getLogin);

authWebRouter.post("/login", authenticate);

/*----- logout -----*/
authWebRouter.get("/logout", getLogout);

/*----- login-error -----*/
authWebRouter.get("/login-error", getLoginError);

/*----- signin -----*/
authWebRouter.get("/signin", getSignin);

authWebRouter.post("/signin", uploader.single("avatar"), postSignin);

export default authWebRouter;
