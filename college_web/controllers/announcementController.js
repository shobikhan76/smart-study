const Announcement = require('../Model/Announcement');

const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    const announcement = new Announcement({
      title,
      content,
      postedBy: req.user.id  
    });

    await announcement.save();
    res.status(201).json({ message: 'Announcement posted', announcement });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('postedBy', 'name role')
      .sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements
};
