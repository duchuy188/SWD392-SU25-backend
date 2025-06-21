const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { uploadChatImage } = require('../config/cloudinary');


router.use(authMiddleware);


router.post('/', (req, res, next) => {
  uploadChatImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }
    next();
  });
}, ChatController.processMessage);


router.post('/new', ChatController.createNewConversation);

router.get('/history', ChatController.getConversationHistory);

router.get('/history/:studentId', ChatController.getConversationHistoryById);
router.get('/all', ChatController.getAllConversations);

router.get('/:chatId', ChatController.getConversationById);

router.delete('/:chatId', ChatController.deleteConversationById);

module.exports = router;
