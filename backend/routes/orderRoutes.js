import express from "express";
import { addOrderItems, getMyOrders, getOrders, getOrderById, updateOrderToPaid, updateOrderToBeDelivered } from "../controllers/orderController.js";
// import asyncHandler from "express-async-handler";
// import Product from "../models/productModel.js";
const router = express.Router();
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToBeDelivered)

export default router;