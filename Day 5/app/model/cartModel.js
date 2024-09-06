// app/models/cartModel.js
const mongoose = require('mongoose');
const Order = require('./orderModel'); // Import Order model

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.methods.convertToOrder = async function() {
    try {
        const orders = this.items.map(item => ({
            itemName: item.productId, // You may need to fetch the product name if required
            price: item.price,
            createdBy: this.userId,
            createdAt: this.createdAt,
            updatedBy: null, // Set this when the order is updated
            status: 'Pending'
        }));
        
        // Save orders to the database
        return await Order.insertMany(orders);
    } catch (err) {
        throw new Error('Error converting cart to order: ' + err.message);
    }
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
