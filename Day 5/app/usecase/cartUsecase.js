// app/usecase/cartUsecase.js
const CartRepository = require('../repository/cartRepository');
const OrderRepository = require('../repository/orderRepository'); // Import OrderRepository

const cartRepository = new CartRepository();
//const orderRepository = new OrderRepository(); // Instantiate OrderRepository

const createCart = async (userId, items) => {
    try {
        return await cartRepository.createCart({ userId, items });
    } catch (err) {
        throw new Error('Error creating cart: ' + err.message);
    }
};

const getCartByUserId = async (userId) => {
    try {
        return await cartRepository.getCartByUserId(userId);
    } catch (err) {
        throw new Error('Error retrieving cart: ' + err.message);
    }
};

const updateCart = async (userId, items) => {
    try {
        return await cartRepository.updateCart(userId, items);
    } catch (err) {
        throw new Error('Error updating cart: ' + err.message);
    }
};

const clearCart = async (userId) => {
    try {
        return await cartRepository.clearCart(userId);
    } catch (err) {
        throw new Error('Error clearing cart: ' + err.message);
    }
};

// New method to convert cart to order
const checkoutCart = async (userId) => {
    try {
        const cart = await cartRepository.getCartByUserId(userId);
        if (!cart) throw new Error('Cart not found');

        await cart.convertToOrder(); // Convert cart to orders
        await cartRepository.clearCart(userId); // Clear cart after checkout

        return { message: 'Cart checked out successfully' };
    } catch (err) {
        throw new Error('Error checking out cart: ' + err.message);
    }
};

module.exports = {
    createCart,
    getCartByUserId,
    updateCart,
    clearCart,
    checkoutCart
};
