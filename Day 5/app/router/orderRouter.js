const express = require('express');
const router = express.Router();
const OrderHandler = require('../handler/orderHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/orders', authMiddleware.verifyToken, OrderHandler.createOrder);
router.get('/orders/:id', authMiddleware.verifyToken, OrderHandler.getOrderById);
router.get('/orders', authMiddleware.verifyToken, OrderHandler.getAllOrders);
router.put('/orders/:id', authMiddleware.verifyToken, OrderHandler.updateOrder);
router.delete('/orders/:id', authMiddleware.verifyToken, OrderHandler.deleteOrder);
router.post('/checkout', authMiddleware.verifyToken, OrderHandler.checkout);

module.exports = router;
