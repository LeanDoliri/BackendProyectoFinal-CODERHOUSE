import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    email: {type: String, required: true},
    adress: {type: String, required: true},
    date: {type: String, required: true},
    items: {type: Array, required: true}
});

export default mongoose.model("carts", cartSchema);