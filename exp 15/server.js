const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ecommerceDB");

// Schema
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

// Routes

// Add Product
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Get All Products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get Products by Category
app.get("/products/category/:category", async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
});

// Project Specific Variant Details
app.get("/products/variants", async (req, res) => {
  const products = await Product.find({}, { name: 1, "variants.color": 1, "variants.stock": 1 });
  res.json(products);
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
