const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  adminCreateUser,
} = require("../controllers/authController");
const User = require("../Model/User");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);

router.post("/login", loginUser);

// ✅ Only admin can get all users
router.get("/", verifyToken, isAdmin, getAllUsers);
router.post("/admin-create-user", verifyToken, isAdmin, adminCreateUser);

router.post("/create-initial-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
