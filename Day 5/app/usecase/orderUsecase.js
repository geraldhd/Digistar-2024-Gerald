const orderRepository = require('../repository/orderRepository');

const createOrder = async (orderData) => {
    return await orderRepository.createOrder(orderData);
};

const getAllOrders = async () => {
    return await orderRepository.getAllOrders();
};

const getOrderById = async (orderId) => {
    return await orderRepository.getOrderById(orderId);
};

const updateOrder = async (orderId, updateData) => {
    return await orderRepository.updateOrder(orderId, updateData);
};

const deleteOrder = async (orderId) => {
    return await orderRepository.deleteOrder(orderId);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
