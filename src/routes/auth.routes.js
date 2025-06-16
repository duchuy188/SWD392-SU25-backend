const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const GoogleAuthController = require('../controllers/GoogleAuthController');
const { authMiddleware } = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

// Routes không yêu cầu xác thực
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google-login', GoogleAuthController.googleLogin);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/reset-password', AuthController.resetPassword);

// Routes yêu cầu xác thực
router.get('/profile', authMiddleware, AuthController.getCurrentUser);
router.put('/update', authMiddleware, uploadMiddleware, AuthController.updateUser);
router.put('/change-password', authMiddleware, AuthController.changePassword);

module.exports = router;
