import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
})

export default mongoose.models.User || mongoose.model("User", userSchema);