const CartRepository = require('../repository/cartRepository');
const cartSchema = require('../usecase/validation/cartValidation');

class CartUsecase {
    async createCart(cartData) {
        // Validasi data menggunakan schema Joi
        const { error } = cartSchema.validate(cartData);
        if (error) {
            throw new Error(error.details[0].message);
        }
    
        try {
            return await CartRepository.createCart(cartData);
        } catch (error) {
            console.log("usecase error:", error);
            throw new Error('Failed to create cart: ' + error.message);
        }
    };


    async getCartByUserId(userId) {
        return await CartRepository.getCartByUserId(userId);
    }

    async updateCart(userId, updateData) {
        // Add validation if needed
        return await CartRepository.updateCart(userId, updateData);
    }

    async deleteCart(userId) {
        return await CartRepository.deleteCart(userId);
    }
}

module.exports = new CartUsecase();
