import express from "express";

import { verifyAdmin, verifyToken } from "../services/verifyService.js";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopicById,
  getUserByTopic,
  updateTopic,
} from "../controllers/topic.controller.js";

const router = express.Router();
router.get("/getall", getTopic);
router.get("/:id", getTopicById);
router.get("/user/:id", verifyAdmin, getUserByTopic);
router.post("/", verifyAdmin, createTopic);
router.delete("/:id", verifyAdmin, deleteTopic);
router.patch("/:id", verifyAdmin, updateTopic);

export default router;
