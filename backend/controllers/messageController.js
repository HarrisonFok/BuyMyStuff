import asyncHandler from "express-async-handler";
import Message from '../models/messageModel.js';

// @desc Create a new message
// @route POST /api/messages
// @access Private
const addMessage = asyncHandler(async (req, res) => {
    const { room, content } = req.body;
    const { author, message } = content
    const msg = new Message({ user: req.user._id, username: author, room, message: message });
    const createdMessage = msg.save();
    res.status(201).json(createdMessage)
});

// @desc Get all messages
// @route GET /api/messages
// @access Private
const getMessages = asyncHandler(async (req, res) => {
    const { room } = req.params
    const messages = await Message.find({ room })
    console.log("messages: ", messages)
    res.json(messages)
});

export { addMessage, getMessages }