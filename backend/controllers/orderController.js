import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';

// @desc Create a new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress,paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        // bad request
        res.status(400)
        throw new Error("No order items")
    } else {
        const order = new Order({orderItems, user: req.user._id, shippingAddress,paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice })
        const createdOrder = await order.save()
        // 201 = something created
        res.status(201).json(createdOrder)
    }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    // also want to get the name and email associated with the user with this id
    // - populate from user and put in space-separated fields (will be attached to this findById)
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
});

export {addOrderItems, getOrderById} 