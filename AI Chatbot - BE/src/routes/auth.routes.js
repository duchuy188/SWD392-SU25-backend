const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Routes không yêu cầu xác thực
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Routes yêu cầu xác thực
router.get('/profile', authMiddleware, AuthController.getCurrentUser);
router.put('/update', authMiddleware, AuthController.updateUser);
router.put('/change-password', authMiddleware, AuthController.changePassword);

module.exports = router;