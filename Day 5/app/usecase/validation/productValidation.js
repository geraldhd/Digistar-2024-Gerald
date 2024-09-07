const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().greater(0).required(),
    description: Joi.string().optional()
});

module.exports = {
    productSchema
};
