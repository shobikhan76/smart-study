const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Comes from authMiddleware

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

module.exports = checkRole;
