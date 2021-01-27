import express from "express";
import { execChatApp } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/letsChat").get(protect, execChatApp)

export default router;