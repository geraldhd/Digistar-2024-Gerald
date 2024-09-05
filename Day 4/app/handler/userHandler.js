const userUsecase = require('../usecase/userUsecase');

const createUser = async (req, res) => {
    try {
        const newUser = await userUsecase.createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userUsecase.getAllUsers();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userUsecase.getUserById(req.params.id); // Use req.params.id directly
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userUsecase.updateUser(req.params.id, req.body); // Use req.params.id directly
        if (updatedUser) {
            res.send(updatedUser);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const success = await userUsecase.deleteUser(req.params.id); // Use req.params.id directly
        if (success) {
            res.send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { name, email } = req.query;
        const users = await userUsecase.searchUsers(name, email);
        
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(200).send({ message: 'No users found' });
        }
    } catch (err) {
        console.error('Error in searchUsers:', err); // Log error ke konsol untuk debugging
        res.status(500).send({ error: 'Internal Server Error' });
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
