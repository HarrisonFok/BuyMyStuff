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

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name;
        // console.log("user.name: ", user.name);
        // console.log("req.body: ", req.body);
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: "User removed"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
    res.json(users)
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc Update user 
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc Add a user question
// @route POST /api/users/:id/questions
// @access Private
const addQuestion = asyncHandler(async (req, res) => {
    const { question } = req.body;

    const user = await User.findById(req.user._id)
    // console.log(req.user._id)

    if (user) {
        const newQuestion = {
            name: req.user.name,
            question: question,
            user: req.user._id
        }

        // Add the question to the questions list of the user
        user.questions.push(newQuestion)

        // Save the user (with an additional question) to the database
        await user.save()
        res.status(201).json({message: "Question added"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc Get a user's questions
// @route GET /api/users/:id/questions
// @access Private
const getQuestions = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    // console.log(req.user._id)

    if (user) {
        const questions = user.questions
        res.json(questions)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

// @desc Get a specific user question
// @route GET /api/users/:id/questions/:id
// @access Private
const getSingleQuestion = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    // console.log(req.params.id)

    if (user) {
        const questions = user.questions
        const question = questions.filter(q =>  {return JSON.stringify(q._id) === JSON.stringify(req.params.qId)})
        res.json(question)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, addQuestion, getQuestions, getSingleQuestion} 