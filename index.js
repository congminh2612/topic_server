import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT_DEFAULT;
app.use(cors());

//connect database
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log("MongoDB connected successfully");
  }
};
dbConnect();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
