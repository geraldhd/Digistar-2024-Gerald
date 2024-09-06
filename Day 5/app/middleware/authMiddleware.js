const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden

        req.user = await User.findById(user.id); // Attach user information to request
        next();
    });
};

module.exports = authenticateToken;
