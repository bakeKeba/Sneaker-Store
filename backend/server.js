const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf8"));
let cart = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "cart.json"), "utf8"));

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


// Get cart items
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post("/api/cart", (req, res) => {
  const newShoe = req.body.shoe;

  if (!newShoe) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  const cartPath = path.join(__dirname, "data", "cart.json");
  let cart = [];

  try {
    const cartData = fs.readFileSync(cartPath, "utf8");
    cart = JSON.parse(cartData);
  } catch (error) {
    console.error("Error reading cart file:", error);
  }

  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === newShoe.id && item.size === newShoe.size
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].amount += 1;
  } else {
    cart.push(newShoe);
  }

  try {
    fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error writing cart file:", error);
    res.status(500).json({ message: "Failed to update cart" });
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
