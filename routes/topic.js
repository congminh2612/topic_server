import express from "express";

import { verifyAdmin } from "../services/verifyService.js";
import { createTopic } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/", verifyAdmin, createTopic);

export default router;
