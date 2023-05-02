export const getHome = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("home.ejs", { user: req.session.passport?.user });
    }
}