import express from "express";
const router = express.Router();
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
router.post("/login", authUser)
// middleware as the first argument
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

export default router;