const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
} = require('../handler/userHandler');

// Define routes and associate them with handler functions
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/search', searchUsers);

module.exports = router;
