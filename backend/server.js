// Common JS, will move to ES modules later
import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config()

connectDB()

const app = express()

app.get("/", (req, res) => {
    res.send("API running...")
})

// Mount it -> for anything that goes to this, link to productRoutes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 

// Notes:
// Just by this alone, http://localhost:5000/api/products will contain all products
// Whenever you create .env, restart the server
