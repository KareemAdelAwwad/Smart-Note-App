import mongoose from "mongoose";
import { hashPassword } from "../../utils/index.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already taken"],
  },
  password: { type: String, required: true },
  profilePicturePath: String
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);