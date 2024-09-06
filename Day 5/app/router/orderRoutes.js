const express = require('express');
const router = express.Router();
const orderHandler = require('../handler/orderHandler');
const authenticateToken = require('../middleware/authMiddleware');

// Apply middleware to all order routes
router.post('/', authenticateToken, orderHandler.createOrder);
router.get('/', authenticateToken, orderHandler.getAllOrders);
router.get('/:orderId', authenticateToken, orderHandler.getOrderById);
router.put('/:orderId', authenticateToken, orderHandler.updateOrder);
router.delete('/:orderId', authenticateToken, orderHandler.deleteOrder);

module.exports = router;
