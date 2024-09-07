const ProductUsecase = require('../usecase/productUsecase');

class ProductHandler {
    async createProduct(req, res) {
        try {
            const product = await ProductUsecase.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await ProductUsecase.getProductById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await ProductUsecase.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductUsecase.updateProduct(req.params.id, req.body);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await ProductUsecase.deleteProduct(req.params.id);
            if (!result) return res.status(404).json({ message: 'Product not found' });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ProductHandler();
