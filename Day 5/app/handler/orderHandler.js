const OrderUsecase = require('../usecase/orderUsecase');

class OrderHandler {
    async createOrder(req, res) {
        try {
            const order = await OrderUsecase.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message }); // Mengirim error jika validasi gagal
        }
    }

    async checkout(req, res) {
        try {
            // Validasi apakah userId tersedia di req.user
            if (!req.user || !req.user._id) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
    
            const userId = req.user._id;
    
            // Panggil checkout di usecase
            const order = await OrderUsecase.checkout(userId);
    
            // Kirimkan response dengan order jika berhasil
            return res.status(201).json(order);
        } catch (error) {
            // Kirimkan response error jika terjadi masalah
            console.error('Handler error:', error.message); // Log error untuk debugging
            return res.status(500).json({ message: 'Failed to create order' });
        }
    }
    
    

    async getOrderById(req, res) {
        try {
            const order = await OrderUsecase.getOrderById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await OrderUsecase.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const order = await OrderUsecase.updateOrder(req.params.id, req.body);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const result = await OrderUsecase.deleteOrder(req.params.id);
            if (!result) return res.status(404).json({ message: 'Order not found' });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderHandler();
