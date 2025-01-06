async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Middleware for role-based access
const authMiddleware = (roles) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = decoded; // Pass user data to the next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};