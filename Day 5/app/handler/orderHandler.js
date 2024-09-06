const orderUsecase = require('../usecase/orderUsecase');

const createOrder = async (req, res) => {
    try {
        const { itemName, price, status } = req.body;
        const createdBy = req.user._id; // Mendapatkan ID pengguna dari token JWT
        const newOrder = await orderUsecase.createOrder({ itemName, price, createdBy, status });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderUsecase.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderUsecase.getOrderById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updateData = req.body;
        updateData.updatedBy = req.user._id; // Mendapatkan ID pengguna dari token JWT
        const updatedOrder = await orderUsecase.updateOrder(req.params.orderId, updateData);
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderUsecase.deleteOrder(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
