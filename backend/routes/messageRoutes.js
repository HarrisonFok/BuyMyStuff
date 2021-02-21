import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/:room").post(protect, addMessage).get(protect, getMessages)

export default router;