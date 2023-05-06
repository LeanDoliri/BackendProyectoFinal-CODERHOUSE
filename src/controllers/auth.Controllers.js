import moment from "moment";

import { generateHashPassword } from "../utils/bcrypt/bcrypt.js";
import { sendNewUserEmail } from "../utils/nodemailer/nodemailer.js";

import CartDAOMongoDB from "../models/dao/Cart.DAO.js";
import MessagesDAOMongoDB from "../models/dao/Messages.DAO.js";
import UserDAOMongoDB from "../models/dao/User.DAO.js";

const cartApi = new CartDAOMongoDB();
const messagesApi = new MessagesDAOMongoDB();
const usersApi = new UserDAOMongoDB();

export const getLogin = async (req, res) => {
    res.render("auth/login.ejs");
}

export const getLogout = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("login");
    } else {
        res.render("auth/logout.ejs", {
            name: req.session.passport?.user.name,
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
    const { name, age, phone, adress, email, password } = req.body;
    const usersDB = await usersApi.getAll();
    const userExist = usersDB.find(usr => usr.email == email);

    if (userExist) {
        res.render("auth/signin-error.ejs");
    } else {
        const newUser = {
            name,
            age,
            phone,
            adress,
            avatar: req.body.fileName,
            email,
            password: await generateHashPassword(password),
        };
        const cart = {
            email: email,
            adress: adress,
            date: moment().format('DD/MM/YYYY, HH:mm:ss'),
            items: [],
        };
        const chat = {
            email: email,
            messages: [],
        }

        await usersApi.save(newUser);
        await cartApi.save(cart);
        await messagesApi.save(chat);

        sendNewUserEmail(newUser);

        res.redirect("/login");
    }
}