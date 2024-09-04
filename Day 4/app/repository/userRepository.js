// app/repository/userRepository.js
const User = require('../model/userModel');

class UserRepository {
    async addUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async getAllUsers() {
        return await User.find();
    }

    async updateUser(id, updatedData) {
        return await User.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async deleteUser(id) {
        const result = await User.findByIdAndDelete(id);
        return result != null;
    }

    async searchUsers(name, email) {
        const query = {};
        if (name) query.name = new RegExp(name, 'i');
        if (email) query.email = new RegExp(email, 'i');
        return await User.find(query);
    }
}

module.exports = UserRepository;
