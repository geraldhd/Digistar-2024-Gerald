const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Order', orderSchema);
