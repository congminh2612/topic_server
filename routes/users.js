import express from "express";
import { getAllUser } from "../controllers/user.controller.js";
import { verifyAdmin } from "../services/verifyService.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllUser);

export default router;
