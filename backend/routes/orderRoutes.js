import express from "express";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
// import asyncHandler from "express-async-handler";
// import Product from "../models/productModel.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems)
router.route("/:id").get(protect, getOrderById)

export default router;