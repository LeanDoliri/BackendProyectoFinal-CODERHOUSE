export const getCart = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("cart.ejs", { user: req.session.passport?.user });
    }
}