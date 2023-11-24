import express from "express";
import {
  deleteUser,
  getAllUser,
  getTopicByUser,
  getUserById,
  subscribeTopic,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../services/verifyService.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", verifyAdmin, getAllUser);
router.get("/topic/:id", verifyToken, getTopicByUser);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);
router.post("/subscribe", verifyToken, subscribeTopic);

export default router;
