// controllers/cartController.js
const Cart = require('../models/Cart');  // Adjust this path based on your project structure

// Controller to add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ msg: 'Product ID and quantity are required' });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Add product to cart
    cart.items.push({ productId, quantity });
    await cart.save();

    res.status(200).json({ msg: 'Product added to cart', cart });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding to cart', error: err.message });
  }
};
