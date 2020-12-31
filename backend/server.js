// Common JS, will move to ES modules later
const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("API running...")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 

// Notes:
// Just by this alone, http://localhost:5000/api/products will contain all products
// Whenever you create .env, restart the server