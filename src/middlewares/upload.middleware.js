const { uploadProfilePicture } = require('../config/cloudinary');

const uploadMiddleware = (req, res, next) => {
  uploadProfilePicture(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'Kích thước file không được vượt quá 2MB'
        });
      }
      return res.status(400).json({
        error: err.message
      });
    }
    next();
  });
};

module.exports = uploadMiddleware;