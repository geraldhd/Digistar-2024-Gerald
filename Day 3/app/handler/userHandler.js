const UserUsecase = require('../../domain/usecase/userUsecase');
const UserRepository = require('../../domain/repository/userRepository');
const User = require('../../domain/model/user');

const userRepository = new UserRepository();
const userUsecase = new UserUsecase(userRepository);

async function getAllUsers(req, res) {
    try {
        const users = userRepository.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = userRepository.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const newUser = userUsecase.createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        const updatedUser = userRepository.updateUser(userId, { name, email });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const success = userRepository.deleteUser(userId);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function searchUsers(req, res) {
    try {
        const { name, email } = req.query;
        const users = userRepository.searchUsers(name, email);
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
};
