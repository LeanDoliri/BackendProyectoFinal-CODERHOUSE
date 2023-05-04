export const getAdmin = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin-home.ejs", { user: req.session.passport?.user });
    }
}