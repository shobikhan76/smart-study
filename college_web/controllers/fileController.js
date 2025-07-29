const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = req.file.path;
    const publicId = req.file.filename;

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl,
      publicId
    });

  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
};

module.exports = { uploadFile };
