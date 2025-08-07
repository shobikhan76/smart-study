const Application = require("../Model/Application");

// Create application
const createApplication = async (req, res) => {
  try {
    // Use req.user.id for user field (not _id)
    const exists = await Application.findOne({ user: req.user.id });
    if (exists)
      return res
        .status(400)
        .json({ message: "You already submitted an application" });

    // Validate required fields (adjust as per your Application model)
    const requiredFields = [
      "name",
      "department",
      "fatherName",
      "dateOfBirth",
      "city",
      "previousSchool",
      "board",
      "marks",
      "passingYear",
    ];
    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }

    // Use user email from token if not provided
    let email = req.body.email;
    if (!email && req.user.email) email = req.user.email;

    // Create application
    const application = await Application.create({
      user: req.user.id,
      ...req.body,
      email,
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    // Log the error for debugging
    console.error("Application submission error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update application (by user)
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    Object.assign(application, req.body);
    await application.save();

    res.status(200).json({ message: "Application updated", application });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete application (by user)
const deleteApplication = async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get own application
const getMyApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ user: req.user._id });
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate(
      "user",
      "name email"
    );
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!application) return res.status(404).json({ message: "Not found" });

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: Update application by ID
const adminUpdateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    Object.assign(application, req.body);
    await application.save();

    res.status(200).json({ message: "Application updated", application });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: Delete application by ID
const adminDeleteApplication = async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createApplication,
  updateApplication,
  deleteApplication,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  adminUpdateApplication, // <-- export
  adminDeleteApplication, // <-- export
};
