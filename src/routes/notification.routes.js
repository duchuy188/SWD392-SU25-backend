const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');


router.use(authMiddleware);


router.post('/register-token', NotificationController.registerToken);
router.post('/unregister-token', NotificationController.unregisterToken);


router.post('/send-to-user', adminMiddleware, NotificationController.sendNotificationToUser);
router.post('/send-to-many', adminMiddleware, NotificationController.sendNotificationToMany);
router.post('/send-to-all', adminMiddleware, NotificationController.sendNotificationToAll);

module.exports = router;