
const express = require("express");
const { placeOrder } = require("../controllers/orderController"); // Ensure this path is correct
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);

module.exports = router;
