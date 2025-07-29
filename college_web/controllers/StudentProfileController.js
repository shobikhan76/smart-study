const StudentProfile = require('../Model/StudentProfile');

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const existing = await StudentProfile.findOne({ user: req.user._id });

    if (existing) {
      const updated = await StudentProfile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true }
      );
      return res.json(updated);
    } else {
      const profile = new StudentProfile({
        ...req.body,
        user: req.user._id,
      });
      await profile.save();
      res.status(201).json(profile);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
};

// Get own profile
exports.getOwnProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user._id }).populate('user', 'email');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Admin: Get all student profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find().populate('user', 'email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all profiles', error });
  }
};

// Delete profile (Admin or student)
exports.deleteProfile = async (req, res) => {
  try {
    await StudentProfile.findOneAndDelete({ user: req.params.userId });
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
};
