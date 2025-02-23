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
const cartPath = path.join(__dirname, "data", "cart.json");

fs.writeFileSync(cartPath, JSON.stringify([], null, 2));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get("/api/cart", (req, res) => {
  try {
    const cart = fs.existsSync(cartPath)
      ? JSON.parse(fs.readFileSync(cartPath, "utf8"))
      : [];
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error reading cart file:", error);
    res.status(500).json({ message: "Failed to retrieve cart" });
  }
});


app.post("/api/cart", (req, res) => {
  const newShoe = req.body;
  if (!newShoe || !newShoe.id || !newShoe.size) {
    return res.status(400).json({ message: "Invalid product data" });
  }
  try {
    let cart = [];
    if (fs.existsSync(cartPath)) {
      cart = JSON.parse(fs.readFileSync(cartPath, "utf8"));
    }
    const existingItem = cart.find(
      (item) => item.id === newShoe.id && item.size === newShoe.size
    );
    if (existingItem) {
      existingItem.amount += 1;
    } else {
      const cartId = cart.length > 0 ? Math.max(...cart.map(item => item.cartId)) + 1 : 1;
      cart.push({ ...newShoe, cartId, amount: 1 });
    }
    fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error updating cart file:", error);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

app.put("/api/cart/:cartId", (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const { amount } = req.body;

  if (!amount || amount < 1) {
    return res.status(400).json({ message: "Invalid amount value" });
  }

  try {
    let cart = [];
    if (fs.existsSync(cartPath)) {
      cart = JSON.parse(fs.readFileSync(cartPath, "utf8"));
    }

    const item = cart.find((item) => item.cartId === cartId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.amount = amount;

    fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
});


app.delete("/api/cart/:id", (req, res) => {
  const cartId = parseInt(req.params.id);

  try {
    let cart = [];
    if (fs.existsSync(cartPath)) {
      cart = JSON.parse(fs.readFileSync(cartPath, "utf8"));
    }

    cart = cart.filter((item) => item.cartId !== cartId);

    fs.writeFileSync(cartPath, JSON.stringify(cart, null, 2));

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart file:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});


app.delete("/api/cart", (req, res) => {
  cart = [];
  fs.writeFileSync(path.join(__dirname, "data", "cart.json"), JSON.stringify(cart, null, 2));
  res.status(200).json(cart);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
