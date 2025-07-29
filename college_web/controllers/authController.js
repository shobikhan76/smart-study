const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // remove role from destructuring
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Always assign 'applicant' role for public registration
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: "applicant",
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "User created by admin", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// .
// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (!existingEmail) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingEmail.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: existingEmail._id,
        role: existingEmail.role,
        name: existingEmail.name,
      },
      process.env.jwt_secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: existingEmail._id,
        name: existingEmail.name,
        role: existingEmail.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🔹 Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // exclude password
    res.status(200).json(users );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser, getAllUsers , adminCreateUser };
