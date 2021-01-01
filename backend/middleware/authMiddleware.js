// validate the token

import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';

// asyncHandler handles any exceptions
const protect = asyncHandler(async(req, res, next) => {
    let token
    let reqHeaderAuth = req.headers.authorization;
    if (reqHeaderAuth && reqHeaderAuth.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            /*
            {
                userId: '5fda6752e47632d764b1dc3a',
                iat: 1608420926,
                exp: 1611012926
            }
            */
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not authorized. Token failed")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized. No token")
    }
})

export { protect } 