import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    messages: {type: Array, required: true}
});

export default mongoose.model("messages", messagesSchema);