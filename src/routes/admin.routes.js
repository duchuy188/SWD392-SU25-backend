// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');


router.use(authMiddleware, adminMiddleware);


router.get('/users', AdminController.getUserList); 
router.get('/users/:id', AdminController.getUserById);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.put('/users/:id/status', AdminController.updateUserStatus);

module.exports = router;