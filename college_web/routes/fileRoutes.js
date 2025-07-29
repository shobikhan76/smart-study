const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { verifyToken } = require('../middleware/authMiddleware');
const { uploadFile } = require('../controllers/fileController');

// ✅ Upload assignment (authenticated users only)
router.post('/assignment', verifyToken, upload.single('file'), uploadFile);

// ❌ Removed: getAllAssignments (commented out)
// router.get('/getAssignment', verifyToken, getAllAssignments);

module.exports = router;
