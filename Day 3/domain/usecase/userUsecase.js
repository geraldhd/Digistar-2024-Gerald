const crypto = require('crypto');
const { reverseString } = require('code-class-gerald'); // Import fungsi reverseString

class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    generateUserId() {
        return crypto.randomUUID(); // Generate a unique user ID
    }

    validateUserData(name, email) {
        if (!name || !email) {
            throw new Error('Name and email are required');
        }
        if (!email.includes('@')) {
            throw new Error('Invalid email format');
        }
    }

    createUser(name, email, password = null) {
        this.validateUserData(name, email);

        if (!password) {
            password = crypto.randomBytes(8).toString('hex'); // Generate a random password
        }

        const id = this.generateUserId();
        const reverseName = reverseString(name); // Buat variabel reverseName menggunakan fungsi reverseString
        const newUser = { id, name, reverseName, email, password };

        return this.userRepository.addUser(newUser);
    }

    // Additional methods for other use cases
}

module.exports = UserUsecase;
