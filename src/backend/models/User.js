import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
  mobile: { type: String },
  address: { type: String },
  feedbacks: [feedbackSchema],
});
export default mongoose.model("User", userSchema);
