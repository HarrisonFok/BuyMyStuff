// Common JS, will move to ES modules later
import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import colors from "colors";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config()

connectDB()

const app = express()

// in order to access json data in the req.body - body parser
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API running...")
})

// Mount it -> for anything that goes to this, link to productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)

// Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 

// Notes:
// Just by this alone, http://localhost:5000/api/products will contain all products
// Whenever you create .env, restart the server
