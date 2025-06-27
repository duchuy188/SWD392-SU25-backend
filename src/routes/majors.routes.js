const express = require('express');
const router = express.Router();
const MajorController = require('../controllers/MajorController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');
const { uploadMajorImage } = require('../config/cloudinary');


router.get('/', MajorController.getAllMajors);


router.get('/admin', authMiddleware, adminMiddleware, MajorController.getAllMajorsAdmin);


router.get('/:id', MajorController.getMajorById);


router.use(authMiddleware, adminMiddleware);
router.post('/', uploadMajorImage, MajorController.createMajor);
router.put('/:id', uploadMajorImage, MajorController.updateMajor);
router.delete('/:id', MajorController.deleteMajor);

module.exports = router;
