const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const head = req.headers['authorization'];
    if (!head || !head.startsWith('Bearer'))
        return res.status(401).json({ error: "Access denied" })
    const token = head.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
module.exports = authorize;