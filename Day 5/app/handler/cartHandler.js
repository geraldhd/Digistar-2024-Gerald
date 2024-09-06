// app/handler/cartHandler.js
const cartUsecase = require('../usecase/cartUsecase');

const createCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token
        const items = req.body.items;
        const newCart = await cartUsecase.createCart(userId, items);
        res.status(201).send(newCart);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token
        const cart = await cartUsecase.getCartByUserId(userId);
        if (cart) {
            res.send(cart);
        } else {
            res.status(404).send({ error: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token
        const items = req.body.items;
        const updatedCart = await cartUsecase.updateCart(userId, items);
        res.send(updatedCart);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token
        await cartUsecase.clearCart(userId);
        res.send({ message: 'Cart cleared successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// New handler for checkout
const checkoutCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from token
        const result = await cartUsecase.checkoutCart(userId);
        res.send(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

module.exports = {
    createCart,
    getCartByUserId,
    updateCart,
    clearCart,
    checkoutCart
};
