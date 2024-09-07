const Joi = require('joi');
const orderSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),  // Pastikan productId berupa string
            quantity: Joi.number().min(1).required(),
            price: Joi.number().required()
        })
    ),
    totalPrice: Joi.number().required(),
    createdBy: Joi.string().required(),
    shippingAddress: Joi.string().optional(),
    paymentMethod: Joi.string().valid('Credit Card', 'PayPal', 'Bank Transfer').optional(),
    deliveryStatus: Joi.string().valid('Pending', 'Shipped', 'In Transit', 'Delivered', 'Returned').optional(),
    discountCode: Joi.string().optional(),
    status: Joi.string().valid('Pending', 'Completed', 'Cancelled').optional(),
    createdAt: Joi.date().optional(),
    updatedBy: Joi.string().optional()
});

module.exports = orderSchema;
