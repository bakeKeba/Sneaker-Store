const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf8"));
let cart = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "cart.json"), "utf8"));

// Get all products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Get cart items
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post("/api/cart", (req, res) => {
  const productId = req.body.productId;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    fs.writeFileSync(path.join(__dirname, "data", "cart.json"), JSON.stringify(cart, null, 2));
    res.status(201).json(cart);
  } else {
    res.status(404).json({ message: "Product not found"});
  }
});

// Remove item from cart
app.delete("/api/cart/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(p => p.id !== productId);
  fs.writeFileSync(path.join(__dirname, "data", "cart.json"), JSON.stringify(cart, null, 2));
  res.status(200).json(cart);
});

// Clear cart
app.delete("/api/cart", (req, res) => {
    cart = [];
    fs.writeFileSync(path.join(__dirname, "data", "cart.json"), JSON.stringify(cart, null, 2));
    res.status(200).json(cart);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
