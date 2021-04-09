import jwt from "jsonwebtoken";

const generateToken = userId => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

const generateResetToken = userId => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "20m"
    })
}

export { generateToken, generateResetToken }; 