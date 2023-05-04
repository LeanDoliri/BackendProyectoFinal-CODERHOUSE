import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    state: { type: String, required: true, default: "generada" },
    numOfOrder: { type: Number, required: true },
    email: { type: String, required: true },
    adress: { type: String, required: true },
    date: { type: String, required: true },
    items: { type: Array, required: true }
});

export default mongoose.model("orders", ordersSchema);