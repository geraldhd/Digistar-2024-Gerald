const Joi = require('joi');

const cartSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required()
    })).required()
});

module.exports = cartSchema;
