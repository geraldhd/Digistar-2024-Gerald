const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
            
            if (!decoded || !decoded.userId) {
                return res.status(401).json({ error: 'Invalid token payload' });
            }

            req.user = { _id: decoded.userId }; // Simpan userId di req.user
            next();
        });
    }
};

module.exports = authMiddleware;
