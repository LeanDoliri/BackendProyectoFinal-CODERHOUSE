import ProductsDAOMongoDB from "../models/dao/Products.DAO.js";

const productsApi = new ProductsDAOMongoDB;

export const getAdminHome = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/home.ejs", { user: req.session.passport?.user });
    }
}

export const getUpdate = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        const id = req.params.id;
        const product = await productsApi.getById(id);
        res.render("admin/update.ejs", { product: product[0], user: req.session.passport?.user });
    }
}

export const postUpdate = async (req, res) => {
    const { product, category, price, description, thumbnail } = req.body;
    const id = req.params.id;

    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        const updatedProduct = {
            product: product,
            category: category,
            price: price,
            description: description,
            thumbnail: thumbnail,
        }
        
        await productsApi.update(id, updatedProduct);

        res.redirect("/admin/home");
    }
}

export const getAddProduct = async (req, res) => {
    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        res.render("admin/addProduct.ejs", { user: req.session.passport?.user });
    }
}

export const postAddProduct = async (req, res) => {
    const { product, category, price, description, thumbnail } = req.body;

    if (!req.session.passport?.user) {
        res.render("auth/login.ejs");
    } else {
        const newProduct = {
            product,
            category,
            price,
            description,
            thumbnail,
        }
        
        await productsApi.save(newProduct);

        res.redirect("/admin/home");
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