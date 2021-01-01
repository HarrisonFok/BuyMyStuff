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

export {authUser} 