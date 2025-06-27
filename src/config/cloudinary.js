const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile-pictures',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{
      width: 500,
      height: 500,
      crop: 'limit'
    }]
  }
});

const chatImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'chat-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{
      width: 800,
      height: 800,
      crop: 'limit'
    }]
  }
});

const majorImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'major-images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif','avif'],
    transformation: [{
      width: 800,
      height: 600,
      crop: 'fill',
      gravity: 'center'
    }]
  }
});

const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  limits: {
    fileSize: 2 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh!'), false);
    }
  }
}).single('profilePicture');

const uploadChatImage = multer({
  storage: chatImageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh!'), false);
    }
  }
}).single('image');

const uploadMajorImage = multer({
  storage: majorImageStorage,
  limits: {
    fileSize: 3 * 1024 * 1024 // 3MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh!'), false);
    }
  }
}).single('majorImage');

module.exports = {
  cloudinary,
  uploadProfilePicture,
  uploadChatImage,
  uploadMajorImage
};