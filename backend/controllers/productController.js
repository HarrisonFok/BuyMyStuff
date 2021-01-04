import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  // See if the request query has any keyword
  // If so, match the keyword to the name of the product
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      // case insensitive
      $options: "i"
    }
  } : {};

  const count = await Product.countDocuments({...keyword})

  // either will be empty or will have the keyword in it that'll match the name
  // 
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
  res.json({products, page, pages: Math.ceil(count/pageSize)})
});

// @desc Fetch a single products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({message: "Product not found"})

    // With custom handler
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // assumption: all admins can be trusted (and can delete products they didn't add)
    await product.remove()
    res.json({message: "Product removed"})
  } else {
    // res.status(404).json({message: "Product not found"})

    // With custom handler
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // console.log("here")
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, countInStock} = req.body;

  // Find the product (if exists) from the database
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if user has already submitted a review
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      // bad request
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id
    }

    // Add the review 
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    // Update the overall rating (average)
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save()
    res.status(201).json({message: "Review added"})
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview };