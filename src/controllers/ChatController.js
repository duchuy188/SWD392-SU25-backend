const Conversation = require('../models/Conversation');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Khởi tạo Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Đọc nội dung từ file
const contentPath = path.join(__dirname, '../data/fpt_content.txt');
let fptContent = '';
try {
  if (fs.existsSync(contentPath)) {
    fptContent = fs.readFileSync(contentPath, 'utf8');
    console.log('Content loaded successfully');
  } else {
    console.log('Content file not found, using empty content');
  }
} catch (error) {
  console.error('Error reading content file:', error);
}

const ChatController = {
  async processMessage(req, res) {
    try {
      const { message, studentId } = req.body;
      
      // Sử dụng Gemini để tạo câu trả lời
      const result = await model.generateContent(`
        Bạn là trợ lý tư vấn tuyển sinh của Đại học FPT. 
        Hãy trả lời câu hỏi dựa trên thông tin sau đây về Đại học FPT:
        
        ${fptContent}
        
        Câu hỏi: ${message}
        
        Hãy trả lời ngắn gọn, súc tích và đúng trọng tâm. Chỉ sử dụng thông tin được cung cấp.
        Nếu không có thông tin để trả lời, hãy nói "Tôi không có thông tin về vấn đề này trong tài liệu."
      `);
      
      const response = result.response.text();
      
      // Lưu hội thoại vào database nếu có studentId
      if (studentId) {
        try {
          const conversation = await Conversation.findOne({ student: studentId });
          if (conversation) {
            conversation.interactions.push({
              query: message,
              response,
              timestamp: new Date()
            });
            await conversation.save();
          } else {
            await Conversation.create({
              student: studentId,
              interactions: [{
                query: message,
                response,
                timestamp: new Date()
              }]
            });
          }
        } catch (dbError) {
          console.error('Error saving conversation:', dbError);
        }
      }
      
      res.json({ response });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ChatController;