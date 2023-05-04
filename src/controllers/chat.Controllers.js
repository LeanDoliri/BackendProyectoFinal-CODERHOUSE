export const getChat = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("chat.ejs", { user: req.session.passport?.user });
    }
}