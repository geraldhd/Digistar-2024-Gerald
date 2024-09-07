const UserRepository = require('../repository/userRepository');
const { userSchema, updateUserSchema } = require('./validation/userValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserUsecase {
    async register(userData) {
        // Validate user data
        const { error } = userSchema.validate(userData);
        if (error) throw new Error(error.details[0].message);

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        // Create user in the database
        return await UserRepository.createUser(userData);
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    }
    
    async getUserById(id) {
        return await UserRepository.findById(id);
    }

    async getAllUsers() {
        return await UserRepository.findAll();
    }

    async updateUser(id, updateData) {
        return await UserRepository.updateUser(id, updateData);
    }

    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }
};
    

module.exports = new UserUsecase();
