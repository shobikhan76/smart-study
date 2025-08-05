const multer = require("multer");
const path = require("path");

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use 'uploads/materials' for material uploads, otherwise 'uploads/assignments'
    if (req.baseUrl.includes("materials")) {
      cb(null, "uploads/materials");
    } else {
      cb(null, "uploads/assignments");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// PDF filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
