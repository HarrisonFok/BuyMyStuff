import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addMessage)
router.route("/:room").get(protect, getMessages)

export default router;