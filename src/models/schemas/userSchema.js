import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, default: "user" },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true},
  adress: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('users', userSchema);