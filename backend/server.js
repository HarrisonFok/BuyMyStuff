// Common JS, will move to ES modules later
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import morgan from "morgan";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config()

connectDB()

const app = express()

// only want this to run in development mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// in order to access json data in the req.body - body parser
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running...")
})

// Mount it -> for anything that goes to this, link to productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

// When we're ready to make payment, hit this route and fetch the client id
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// ES modules don't have __dirname (only available in common JS)
const __dirname = path.resolve()
// Make the uploads folder a static one so that it can get loaded in the browser
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 

// Notes:
// Just by this alone, http://localhost:5000/api/products will contain all products
// Whenever you create .env, restart the server
