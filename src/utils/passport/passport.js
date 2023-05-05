import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import { verifyPassword } from "../bcrypt/bcrypt.js";

import UserDAOMongoDB from "../../models/dao/User.DAO.js";
const usersApi = new UserDAOMongoDB();

/*----------- passport -----------*/
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const usersDB = await usersApi.getAll();
      const userExist = usersDB.find(usr => usr.email == email);

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const usersDb = await usersApi.getAll();
  const foundUser = usersDb.find(usr => usr.email === user.email);
  done(null, foundUser);
});

export const authenticate = (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login-error");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      if (user.role === "admin") {
        return res.redirect("/admin/home");
      }
      return res.redirect("/home");
    });
  })(req, res, next);
};