import moment from "moment/moment.js";

import { generateHashPassword } from "../utils/bcrypt/bcrypt.js";
import { sendNewUserEmail } from "../utils/nodemailer/nodemailer.js";

import CartDAOMongoDB from "../models/dao/Cart.DAO.js";
import UserDAOMongoDB from "../models/dao/User.DAO.js";

const cartApi = new CartDAOMongoDB();
const usersApi = new UserDAOMongoDB();

export const getLogin = async (req, res) => {
    res.render("auth/login.ejs");
}

export const getLogout = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("login");
    } else {
        res.render("auth/logout.ejs", {
            nombre: req.session.passport?.user.nombre,
        });
    }
}

export const getLoginError = async (req, res) => {
    res.render("auth/login-error.ejs");
}

export const getSignin = async (req, res) => {
    res.render("auth/signin.ejs");
}

export const postSignin = async (req, res) => {
    const { nombre, direccion, email, password } = req.body;
    const usersDb = await usersApi.getAll();
    const userExist = usersDb.find((usr) => usr.email == email);

    if (userExist) {
        res.render("auth/signin-error.ejs");
    } else {
        const newUser = {
            nombre,
            direccion,
            foto: req.body.fileName,
            email,
            password: await generateHashPassword(password),
        };
        const cart = {
            email: email,
            adress: direccion,
            date: moment().format('DD/MM/YYYY, HH:mm:ss'),
            items: [],
        };

        await usersApi.save(newUser).then((res) => {
            cartApi.save(cart);
            sendNewUserEmail(newUser);
        });

        res.redirect("/login");
    }
}