const User = require('../model/userModel');

const UserRepository = {
    // Existing methods...

    async findByEmail(email) {
        return await User.findOne({ email });
    },

    async findById(id) {
        return await User.findById(id);
    },

    async createUser(userData) {
        return await User.create(userData);
    },

    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    },

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    },

    async findAll() {
        return await User.find();
    }
};
module.exports = UserRepository;
