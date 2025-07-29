const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements
} = require('../controllers/announcementController');

// ✅ Correctly import the middleware functions
const { verifyToken, isAdmin } = require('../Middleware/authMiddleware');

// 🧠 Apply only what you need: verifyToken for normal users, isAdmin if needed
router.post('/', verifyToken, isAdmin, createAnnouncement); // Only admin can create
router.get('/', verifyToken, getAllAnnouncements); // All authenticated users can view

module.exports = router;
