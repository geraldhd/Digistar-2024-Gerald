const express = require('express');
const userHandler = require('../handler/userHandler');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Routes that do not require authentication
router.post('/login', userHandler.loginUser); // Login route doesn't require auth
router.post('/', userHandler.createUser); // Create new user (doesn't require auth)

// Routes that require authentication
router.use(authenticateToken); // Apply authentication middleware to the following routes

router.get('/', userHandler.getAllUsers); // Get all users (typically admin)
router.get('/:id', userHandler.getUserById); // Get specific user by ID
router.get('/search', userHandler.searchUsers); // Search users
router.put('/:id', userHandler.updateUser); // Update specific user
router.delete('/:id', userHandler.deleteUser); // Delete specific user

module.exports = router;
