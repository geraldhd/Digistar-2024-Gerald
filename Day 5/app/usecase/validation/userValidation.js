const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional()
});

module.exports = {
    userSchema,
    updateUserSchema
};
