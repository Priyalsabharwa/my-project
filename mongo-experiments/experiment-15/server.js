const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Schema & Model
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema]
});

const Product = mongoose.model('Product', productSchema);

// --- Routes ---

// Seed data
app.post('/api/products/seed', async (req, res) => {
  const sampleProducts = [
    {
      name: "T-Shirt",
      price: 20,
      category: "Apparel",
      variants: [
        { color: "Red", size: "S", stock: 10 },
        { color: "Blue", size: "M", stock: 5 }
      ]
    },
    {
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      variants: [
        { color: "Silver", size: "15-inch", stock: 3 },
        { color: "Black", size: "13-inch", stock: 2 }
      ]
    },
    {
      name: "Sneakers",
      price: 80,
      category: "Footwear",
      variants: [
        { color: "White", size: 9, stock: 7 },
        { color: "Black", size: 10, stock: 4 }
      ]
    }
  ];

  await Product.deleteMany(); // clear old data
  const inserted = await Product.insertMany(sampleProducts);
  res.json(inserted);
});

// GET all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
