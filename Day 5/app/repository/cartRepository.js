// app/repository/cartRepository.js
const Cart = require('../model/cartModel');

class CartRepository {
    async createCart(cartData) {
        try {
            const cart = new Cart(cartData);
            return await cart.save();
        } catch (err) {
            throw new Error(`Error creating cart: ${err.message}`);
        }
    }

    async getCartByUserId(userId) {
        try {
            return await Cart.findOne({ userId });
        } catch (err) {
            throw new Error(`Error retrieving cart: ${err.message}`);
        }
    }

    async updateCart(userId, updatedItems) {
        try {
            return await Cart.findOneAndUpdate(
                { userId },
                { items: updatedItems, updatedAt: Date.now() },
                { new: true, upsert: true }
            );
        } catch (err) {
            throw new Error(`Error updating cart: ${err.message}`);
        }
    }

    async clearCart(userId) {
        try {
            return await Cart.findOneAndDelete({ userId });
        } catch (err) {
            throw new Error(`Error clearing cart: ${err.message}`);
        }
    }
}

module.exports = CartRepository;
