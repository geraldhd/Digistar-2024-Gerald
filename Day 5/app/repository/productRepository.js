const Product = require('../model/productModel');

class ProductRepository {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }


    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async getAllProducts() {
        return await Product.find();
    }

    async updateProduct(productId, updateData) {
        return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    }

    async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = new ProductRepository();
