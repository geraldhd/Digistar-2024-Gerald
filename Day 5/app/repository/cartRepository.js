const Cart = require('../model/cartModel');


class CartRepository {
    async createCart(cartData) {
        const cart = new Cart(cartData);
        return await cart.save();
    }

    async getCartByUserId(userId) {
        return await Cart.findOne({ userId });
    }

    async updateCart(userId, updateData) {
        return await Cart.findOneAndUpdate({ userId }, updateData, { new: true });
    }

    async deleteCart(userId) {
        return await Cart.findOneAndDelete({ userId });
    }
}

module.exports = new CartRepository();
