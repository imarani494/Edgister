// server.js
const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db/connection");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");

dotenv.config();  // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Connect to DB and start the server
connection
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));
