const OrderRepository = require('../repository/orderRepository');
const CartRepository = require('../repository/cartRepository');
const ProductRepository = require('../repository/productRepository'); // Pastikan ProductRepository ada
const { orderSchema } = require('./validation/orderValidation');

class OrderUsecase {
    async createOrder(orderData) {
        // Validasi data order menggunakan skema Joi
        const { error } = orderSchema.validate(orderData);
        if (error) {
            throw new Error(error.details[0].message); // Mengembalikan error jika validasi gagal
        }
        return await OrderRepository.createOrder(orderData);
    }

    async checkout(userId) {
        try {
            const cart = await CartRepository.getCartByUserId(userId);
            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }
    
            // Ubah productId menjadi string dan pastikan harga diambil dari produk
            const items = await Promise.all(cart.items.map(async item => {
                const product = await ProductRepository.getProductById(item.productId);
                if (!product) throw new Error(`Product with ID ${item.productId} not found`);
    
                return {
                    productId: item.productId.toString(),
                    quantity: item.quantity,
                    price: product.price  // Ambil harga dari produk
                };
            }));
    
            const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    
            const newOrder = {
                items,
                totalPrice,
                createdBy: userId,
                shippingAddress: 'Default Address',
                paymentMethod: 'Credit Card',
                status: 'Pending'
            };
    
            const order = await OrderRepository.createOrder(newOrder);
    
            // Hapus cart setelah checkout
            await CartRepository.deleteCart(userId);
    
            return order;
        } catch (error) {
            console.error('Error during checkout:', error.message); // Log error untuk debugging
            throw new Error('Failed to create order');
        }
    }
    
    
}

module.exports = new OrderUsecase();