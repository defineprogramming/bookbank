const passport = require('passport');

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Please log in to continue' });
}

// Middleware to check if the user is an admin
function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'You do not have permission to perform this action' });
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin
};