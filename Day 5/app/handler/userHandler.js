// app/handler/userHandler.js
const userUsecase = require('../usecase/userUsecase');

const createUser = async (req, res) => {
    try {
        const newUser = await userUsecase.createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userUsecase.loginUser(email, password);
        res.send({ token });
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
        const user = await userUsecase.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userUsecase.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(updatedUser);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const success = await userUsecase.deleteUser(req.params.id);
        if (!success) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { name, email } = req.query;
        const users = await userUsecase.searchUsers(name, email);
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers
};
