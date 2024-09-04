// app/usecase/userUsecase.js
const UserRepository = require('../repository/userRepository');
const reverseString = require('code-class-gerald').reverseString;
const Joi = require('joi');

const userRepository = new UserRepository();

// Define schemas for validation
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6)
});

const createUser = async (userData) => {
    // Validate user data
    const { error } = userSchema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }

    const { name, email, password } = userData;
    const reverseName = reverseString(name);

    const newUser = {
        id: userRepository.users.length + 1, // Generate user ID
        name,
        reverseName,
        email,
        password
    };

    return await userRepository.addUser(newUser);
};

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await userRepository.getUserById(id);
};

const updateUser = async (id, updatedData) => {
    // Validate update data
    const { error } = updateUserSchema.validate(updatedData);
    if (error) {
        throw new Error(error.details[0].message);
    }

    if (updatedData.name) {
        updatedData.reverseName = reverseString(updatedData.name);
    }

    return await userRepository.updateUser(id, updatedData);
};

const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};

const searchUsers = async (name, email) => {
    return await userRepository.searchUsers(name, email);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers
};
