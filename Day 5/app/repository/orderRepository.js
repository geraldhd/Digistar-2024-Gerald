const Order = require('../model/orderModel');

const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

const getAllOrders = async () => {
    return await Order.find().populate('createdBy updatedBy');
};

const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('createdBy updatedBy');
};

const updateOrder = async (orderId, updateData) => {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true }).populate('createdBy updatedBy');
};

const deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
