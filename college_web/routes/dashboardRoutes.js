const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/authMiddleware');
const checkRole = require('../Middleware/roleMiddleware');

// ✅ Only admin can access dashboard summary
router.get('/getDashboard', verifyToken, checkRole('admin'), getDashboardSummary);

module.exports = router;
