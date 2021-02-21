import asyncHandler from "express-async-handler";
import Message from '../models/messageModel.js';

// @desc Create a new message
// @route POST /api/messages
// @access Private
const addMessage = asyncHandler(async (req, res) => {
    const { room, content } = req.body;
    const message = new Message({ user: req.user._id, room, message: content.message });
    const createdMessage = message.save();
    res.status(201).json(createdMessage)
});

export { addMessage }