const express = require('express');
const router = express.Router();
const CartHandler = require('../handler/cartHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/carts', authMiddleware.verifyToken, CartHandler.createCart);
router.get('/carts/:userId', authMiddleware.verifyToken, CartHandler.getCartByUserId);
router.put('/carts/:userId', authMiddleware.verifyToken, CartHandler.updateCart);
router.delete('/carts/:userId', authMiddleware.verifyToken, CartHandler.deleteCart);

module.exports = router;
