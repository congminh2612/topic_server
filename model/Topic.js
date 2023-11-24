import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String, required: true },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
export default mongoose.model("Topic", TopicSchema);
