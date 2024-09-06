// app/router/cartRouters.js
const express = require('express');
const cartHandler = require('../handler/cartHandler');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Routes that require authentication
router.use(authenticateToken); // Apply authentication middleware to the following routes

router.post('/', cartHandler.createCart); // Create cart
router.get('/', cartHandler.getCartByUserId); // Get cart for logged-in user
router.put('/', cartHandler.updateCart); // Update cart for logged-in user
router.delete('/', cartHandler.clearCart); // Clear cart for logged-in user
router.post('/checkout', cartHandler.checkoutCart); // Checkout cart

module.exports = router;
