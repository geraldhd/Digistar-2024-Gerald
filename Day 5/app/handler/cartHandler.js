const CartUsecase = require('../usecase/cartUsecase');

class CartHandler {
    async createCart(req, res) {
        try {
            // Mengirim req.body ke usecase
            const cart = await CartUsecase.createCart(req.body);
            res.status(201).json(cart);
        } catch (error) {
            console.log("handler error:", error);
            res.status(400).json({ message: error.message });
        }
    }

    async getCartByUserId(req, res) {
        try {
            const cart = await CartUsecase.getCartByUserId(req.params.userId);
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            const cart = await CartUsecase.updateCart(req.params.userId, req.body);
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteCart(req, res) {
        try {
            const result = await CartUsecase.deleteCart(req.params.userId);
            if (!result) return res.status(404).json({ message: 'Cart not found' });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CartHandler();
