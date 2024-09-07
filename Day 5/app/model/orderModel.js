const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true }  // Pastikan harga ada dan valid
    }],
    totalPrice: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shippingAddress: { type: String, default: 'Default Address' },
    paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Bank Transfer'], default: 'Credit Card' },
    deliveryStatus: { type: String, enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Returned'], default: 'Pending' },
    discountCode: { type: String },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Order', orderSchema);
