const express = require('express');
const router = express.Router();
const {
  createApplication,
  updateApplication,
  deleteApplication,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  adminUpdateApplication,
  adminDeleteApplication
} = require('../controllers/applicationController');

const { verifyToken, isAdmin , isTeacher } = require('../middleware/authMiddleware');

// User Routes
router.post('/', verifyToken, createApplication);
router.get('/me', verifyToken, getMyApplication); // <-- already present
router.get('/', verifyToken,  getMyApplication);

// Fix: Add user update/delete routes BEFORE admin routes and use correct path
router.put('/:id', verifyToken, updateApplication); // <-- must be before /admin/:id
router.delete('/:id', verifyToken, deleteApplication); // <-- must be before /admin/:id

// Admin Routes
router.get('/admin/all', verifyToken, isAdmin, getAllApplications);
router.get('/admin/:id', verifyToken, isAdmin, getApplicationById);
router.put('/admin/:id', verifyToken, isAdmin, adminUpdateApplication);
router.delete('/admin/:id', verifyToken, isAdmin, adminDeleteApplication);

module.exports = router;
