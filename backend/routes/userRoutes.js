import express from "express";
const router = express.Router();
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, addQuestion, getQuestions, getSingleQuestion, deleteQuestion, editQuestion, getAllQuestions, replyQuestion, deleteComment, getComments} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
// router.route("/:id/questions/:qId").get(protect, getSingleQuestion)

// NEED TO ADD THE PROTECT BACK
router.route("/:id/questions/:qId").delete(deleteQuestion).put(editQuestion)
router.route("/:id/questions").post(addQuestion).get(getQuestions)
router.route("/questionsList/:qId/comments/:cId").delete(deleteComment)
router.route("/questionsList/:qId/comments").get(getComments)
router.route("/questionsList/:qId").get(protect, isAdmin, getSingleQuestion).post(protect, replyQuestion)
router.route("/questionsList").get(protect, isAdmin, getAllQuestions)
router.post("/login", authUser)
// middleware as the first argument
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)

export default router;