const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const head = req.header.authenticate;
    if (!head || !head.startwith('Bearer'))
        return res.status(401).json({ error: "Access denied" })
    const token = head.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};
module.exports = authenticate;