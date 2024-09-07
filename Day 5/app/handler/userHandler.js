const UserUsecase = require('../usecase/userUsecase');

class UserHandler {
    async register(req, res) {
        try {
            const user = await UserUsecase.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await UserUsecase.login(email, password);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserUsecase.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserUsecase.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserUsecase.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserUsecase.deleteUser(req.params.id);
            res.status(204).end();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new UserHandler();
