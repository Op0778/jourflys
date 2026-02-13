import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  type: String,
  price: Number,
  popular: Boolean,
});

export default mongoose.model("Place", placeSchema);
