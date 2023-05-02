export const getProfile = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("profile.ejs", { user: req.session.passport?.user });
    }
}