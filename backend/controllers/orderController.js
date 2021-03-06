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

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        // this will come from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
});

// @desc Update order to be "delivered"
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToBeDelivered = asyncHandler(async (req, res) => {
    // also want to get the name and email associated with the user with this id
    // - populate from user and put in space-separated fields (will be attached to this findById)
    const order = await Order.findById(req.params.id)

    // console.log("order controller", order)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    // also want to get the name and email associated with the user with this id
    // - populate from user and put in space-separated fields (will be attached to this findById)
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
});

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    // also want to get the name and email associated with the user with this id
    // from user, get id and name
    const orders = await Order.find({}).populate("user", "id name")
    res.json(orders)
});

export {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToBeDelivered, getMyOrders, getOrders} 