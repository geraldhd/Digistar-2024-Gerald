const ProductRepository = require('../repository/productRepository');
const { productSchema } = require('./validation/productValidation');

class ProductUsecase {
    async createProduct(productData) {
        const { error } = productSchema.validate(productData);
        if (error) throw new Error(error.details[0].message);
        return await ProductRepository.createProduct(productData);
    }

    async getProductById(productId) {
        return await ProductRepository.getProductById(productId);
    }

    async getAllProducts() {
        return await ProductRepository.getAllProducts();
    }

    async updateProduct(productId, updateData) {
        // Add validation if needed
        return await ProductRepository.updateProduct(productId, updateData);
    }

    async deleteProduct(productId) {
        return await ProductRepository.deleteProduct(productId);
    }
}

module.exports = new ProductUsecase();
