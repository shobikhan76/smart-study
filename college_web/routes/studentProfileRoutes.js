const express = require('express');
const router = express.Router();
const studentProfileController = require('../controllers/studentProfileController');
const { verifyToken , isAdmin } = require('../Middleware/authMiddleware');
// optional if you use roles

// Authenticated student creates or updates profile
router.post('/', verifyToken, studentProfileController.createOrUpdateProfile);

// Authenticated student gets own profile
router.get('/me', verifyToken, studentProfileController.getOwnProfile);

// Admin: Get all student profiles
router.get('/', verifyToken, isAdmin, studentProfileController.getAllProfiles);

// Admin: Delete profile by user ID
router.delete('/:userId', verifyToken, isAdmin, studentProfileController.deleteProfile);

module.exports = router;
