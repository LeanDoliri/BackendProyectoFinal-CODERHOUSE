import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import { verifyPassword } from "../bcrypt/bcrypt.js";

import UserDAOMongoDB from "../../models/dao/User.DAO.js";
const usersApi = new UserDAOMongoDB();

/*----------- passport -----------*/
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async function (email, password, done) {
            const usersDB = await usersApi.getAll();
            const userExist = usersDB.find((usr) => usr.email == email);

            if (!userExist) {
                return done(null, false);
            } else {
                const match = await verifyPassword(userExist, password);

                if (!match) {
                    return done(null, false);
                }
                return done(null, userExist);
            }
        }
    )
);

export const serializeUser = passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

export const deserializeUser = passport.deserializeUser(async (email, done) => {
    const usersDb = await usersApi.getAll();
    const user = usersDb.find((usr) => usr.email == email);
    done(null, user);
});

export const authenticate = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
});