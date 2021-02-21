import express from "express";
import { addMessage } from "../controllers/messageController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addMessage)

export default router;