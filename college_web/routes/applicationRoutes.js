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
router.put('/:id', verifyToken, updateApplication);
router.delete('/:id', verifyToken, deleteApplication);
router.get('/', verifyToken,  getMyApplication);

// Admin Routes
router.get('/admin/all', verifyToken, isAdmin, getAllApplications);
router.get('/admin/:id', verifyToken, isAdmin, getApplicationById);
router.put('/admin/:id', verifyToken, isAdmin, adminUpdateApplication);
router.delete('/admin/:id', verifyToken, isAdmin, adminDeleteApplication);

module.exports = router;
