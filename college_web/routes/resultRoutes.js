const express = require('express');
const {
  createResult,
  getAllResults,
  getResultByRollNumber,
  deleteResult,
} = require('../controllers/resultController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Only admin can access all routes
router.post('/', verifyToken, isAdmin, createResult);
router.get('/', verifyToken, isAdmin, getAllResults);
router.get('/:rollNumber', verifyToken, isAdmin, getResultByRollNumber);
router.delete('/:id', verifyToken, isAdmin, deleteResult);

module.exports = router;
