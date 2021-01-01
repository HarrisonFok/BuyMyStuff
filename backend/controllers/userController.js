import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"

// jwt.io

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    // Get data from the body (when user submits a form)
    const {email, password} = req.body;
    // res.send({email, password});

    const user = await User.findOne({email: email})

    if (user && (await user.matchPassword(password))) {
        const userId = user._id
        res.json({
            _id: userId,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(userId)
        })
    } else {
        res.status(401)
        throw new Error ("Invalid email or password")
    }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    // Get data from the body (when user submits a form)
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email: email})

    // See if user already exists
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Syntactic sugar for User.save(), so the "pre(save)" will be run in the user model
    const user = await User.create({
        name,
        email,
        password
    })

    // If everything is okay
    // 201 - something is created
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // jwt.io
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    // res.send("success")
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

export {authUser, getUserProfile, registerUser} 