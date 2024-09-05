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
        // Assuming you're using MongoDB, _id will be generated automatically
        name,
        reverseName,
        email,
        password
    };

    try {
        return await userRepository.addUser(newUser);
    } catch (err) {
        throw new Error('Error creating user: ' + err.message);
    }
};

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (err) {
        throw new Error('Error retrieving users: ' + err.message);
    }
};

const getUserById = async (id) => {
    try {
        return await userRepository.getUserById(id);
    } catch (err) {
        throw new Error('Error retrieving user: ' + err.message);
    }
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

    try {
        return await userRepository.updateUser(id, updatedData);
    } catch (err) {
        throw new Error('Error updating user: ' + err.message);
    }
};

const deleteUser = async (id) => {
    try {
        return await userRepository.deleteUser(id);
    } catch (err) {
        throw new Error('Error deleting user: ' + err.message);
    }
};

const searchUsers = async (name, email) => {
    try {
        return await userRepository.searchUsers(name, email);
    } catch (err) {
        throw new Error('Error searching users: ' + err.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers
};
