const Order = require('../model/orderModel');

class OrderRepository {
    async createOrder(orderData) {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            console.error('Error saving order:', error.message); // Log error untuk debugging
            throw new Error('Failed to save order');
        }
    }

    async clearCart(userId) {
        try {
            const cart = await Cart.findOne({ userId });
            if (cart) {
                cart.items = [];
                await cart.save();
            }
        } catch (error) {
            throw new Error('Failed to clear cart');
        }
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId).populate('items.productId');
    }

    async getAllOrders() {
        return await Order.find().populate('items.productId');
    }

    async updateOrder(orderId, updateData) {
        return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    }

    async deleteOrder(orderId) {
        return await Order.findByIdAndDelete(orderId);
    }
}

module.exports = new OrderRepository();
