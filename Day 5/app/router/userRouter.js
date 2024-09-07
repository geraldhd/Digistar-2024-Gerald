const express = require('express');
const router = express.Router();
const UserHandler = require('../handler/userHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', UserHandler.register);
router.post('/login', UserHandler.login);
router.get('/users/:id', authMiddleware.verifyToken, UserHandler.getUserById);
router.get('/users', authMiddleware.verifyToken, UserHandler.getAllUsers);
router.put('/users/:id', authMiddleware.verifyToken, UserHandler.updateUser);
router.delete('/users/:id', authMiddleware.verifyToken, UserHandler.deleteUser);

module.exports = router;
