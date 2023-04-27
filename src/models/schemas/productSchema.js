import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export default mongoose.model("products", productSchema);
