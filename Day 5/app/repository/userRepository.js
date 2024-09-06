// app/repository/userRepository.js
const User = require('../model/userModel'); // Perbaiki path ke models

class UserRepository {
    async addUser(userData) {
        try {
            const user = new User(userData);
            return await user.save(); // Save user to the database
        } catch (err) {
            throw new Error(`Error adding user: ${err.message}`);
        }
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(id) {
        try {
            return await User.findById(id); // Find user by ID
        } catch (err) {
            throw new Error(`Error retrieving user by ID: ${err.message}`);
        }
    }

    async getAllUsers() {
        try {
            return await User.find(); // Retrieve all users
        } catch (err) {
            throw new Error(`Error retrieving all users: ${err.message}`);
        }
    }

    async updateUser(id, updatedData) {
        try {
            // Update user by ID and return the new document
            return await User.findByIdAndUpdate(id, updatedData, { new: true });
        } catch (err) {
            throw new Error(`Error updating user: ${err.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const result = await User.findByIdAndDelete(id); // Delete user by ID
            return result != null; // Return true if the user was deleted
        } catch (err) {
            throw new Error(`Error deleting user: ${err.message}`);
        }
    }

    async searchUsers(name, email) {
        try {
            const query = {};
            if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search by name
            if (email) query.email = new RegExp(email, 'i'); // Case-insensitive search by email
            return await User.find(query); // Find users based on query
        } catch (err) {
            throw new Error(`Error searching users: ${err.message}`);
        }
    }
}

module.exports = UserRepository;
