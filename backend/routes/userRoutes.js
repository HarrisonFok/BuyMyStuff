import express from "express";
const router = express.Router();
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, addQuestion, getQuestions, getSingleQuestion} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
router.route("/:id/questions/:qId").get(protect, getSingleQuestion)
router.route("/:id/questions").post(addQuestion).get(getQuestions)
router.post("/login", authUser)
// middleware as the first argument
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)

export default router;