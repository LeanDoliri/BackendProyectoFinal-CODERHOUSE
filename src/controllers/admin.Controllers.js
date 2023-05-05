export const getAdminHome = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/home.ejs", { user: req.session.passport?.user });
    }
}

export const getAddProduct = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/addProduct.ejs", { user: req.session.passport?.user });
    }
}

export const getAdminChat = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/chat.ejs", { user: req.session.passport?.user });
    }
}

export const getProfile = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/profile.ejs", { user: req.session.passport?.user });
    }
}