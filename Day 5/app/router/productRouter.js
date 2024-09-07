const express = require('express');
const router = express.Router();
const ProductHandler = require('../handler/productHandler');

router.post('/products', ProductHandler.createProduct);
router.get('/products/:id', ProductHandler.getProductById);
router.get('/products', ProductHandler.getAllProducts);
router.put('/products/:id', ProductHandler.updateProduct);
router.delete('/products/:id', ProductHandler.deleteProduct);

module.exports = router;
