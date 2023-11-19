import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  description: { type: String, required: true },
});
