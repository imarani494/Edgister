// controllers/orderController.js
const Order = require("../models/Order");

// Controller to place an order
exports.placeOrder = async (req, res) => {
  const { products, totalPrice, shippingAddress } = req.body;
  if (!products || !totalPrice || !shippingAddress) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const newOrder = new Order({
      userId: req.user.userId,  // User is assigned based on the decoded JWT token
      products,
      totalPrice,
      shippingAddress,
    });

    await newOrder.save();
    res.status(201).json({ msg: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ msg: "Error placing order", error: err.message });
  }
};
