const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

// Route xử lý chat
router.post('/', ChatController.processMessage);

module.exports = router;
