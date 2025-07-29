const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'college_files',      // You can name it as needed
    allowed_formats: ['jpg', 'png', 'pdf', 'docx']
  },
});

const upload = multer({ storage });

module.exports = upload;
