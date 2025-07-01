const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Test = require('../models/Test');
const Major = require('../models/Major');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
require('dotenv').config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const visionClient = new ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_VISION_CREDENTIALS)
});


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


const cleanupResponse = (text) => {
  
  let cleanedText = text.replace(/\*\*/g, '').replace(/\*/g, '');
  
  
  cleanedText = cleanedText.replace(/\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)\((https?:\/\/[^)]+)\)/g, '[$1]($2)');
  

  cleanedText = cleanedText.replace(/^(\s+)([A-Za-z0-9])/gm, '$1- $2');
  
  return cleanedText;
};

const topics = {
  HOC_PHI: {
    keywords: ['học phí', 'tiền học', 'chi phí', 'đóng tiền', 'thanh toán', 'học kỳ', 'đồng/HK'],
    description: 'Thông tin về học phí các ngành, campus và các kỳ học'
  },
  HOC_BONG: {
    keywords: ['học bổng', 'miễn giảm', 'giỏi giang', 'chuyên gia toàn cầu', 'học đường', 'toàn phần', '2 năm', '1 năm'],
    description: 'Thông tin về các loại học bổng và điều kiện nhận học bổng'
  },
  HOC_TRUOC_TRA_SAU: {
    keywords: ['học trước trả sau', 'trả dần', 'khó khăn', 'hoàn cảnh', 'hạn mức', 'lãi suất', 'hoàn trả'],
    description: 'Thông tin về chính sách học trước trả sau'
  },
  NGANH_HOC: {
    keywords: ['ngành học', 'chuyên ngành', 'công nghệ thông tin', 'kỹ thuật phần mềm', 'hệ thống thông tin', 'trí tuệ nhân tạo', 'an toàn thông tin', 'quản trị kinh doanh', 'digital marketing', 'kinh doanh quốc tế'],
    description: 'Thông tin về các ngành học và chuyên ngành tại ĐH FPT'
  },
  TUYEN_SINH: {
    keywords: ['tuyển sinh', 'xét tuyển', 'đầu vào', 'điểm chuẩn', 'top50', 'schoolrank', 'phương thức', 'đánh giá năng lực', 'tốt nghiệp THPT'],
    description: 'Thông tin về quy chế và phương thức tuyển sinh'
  },
  CAMPUS: {
    keywords: ['campus', 'cơ sở', 'hà nội', 'hồ chí minh', 'đà nẵng', 'cần thơ', 'quy nhơn', 'liên hệ', 'địa chỉ'],
    description: 'Thông tin về các campus và thông tin liên hệ'
  },
  CHUONG_TRINH_DAO_TAO: {
    keywords: ['chương trình đào tạo', 'môn học', 'tín chỉ', 'syllabus', 'đề cương', 'giáo trình', 'thời gian học', 'khung chương trình'],
    description: 'Thông tin về chương trình đào tạo các ngành'
  },
  THUC_TAP: {
    keywords: ['thực tập', 'OJT', 'on-the-job training', 'doanh nghiệp', 'công ty', 'kinh nghiệm'],
    description: 'Thông tin về chương trình thực tập'
  },
  CO_SO_VAT_CHAT: {
    keywords: ['cơ sở vật chất', 'phòng học', 'phòng lab', 'thư viện', 'ký túc xá', 'canteen', 'căn tin'],
    description: 'Thông tin về cơ sở vật chất'
  }
};


function identifyTopics(question) {
  const lowerQuestion = question.toLowerCase();
  const relatedTopics = [];
  
  for (const [topic, info] of Object.entries(topics)) {
    for (const keyword of info.keywords) {
      if (lowerQuestion.includes(keyword.toLowerCase())) {
        relatedTopics.push(topic);
        break;
      }
    }
  }
  
  return relatedTopics.length > 0 ? relatedTopics : ['GENERAL'];
}


function formatConversationHistory(interactions, maxInteractions = 10) {
  const recentInteractions = interactions.slice(-maxInteractions);
  
  if (recentInteractions.length === 0) {
    return '';
  }
  
  return `
### LỊCH SỬ HỘI THOẠI GẦN ĐÂY (${recentInteractions.length} tin nhắn):
${recentInteractions.map((interaction, index) => 
  `[${index + 1}] Người dùng: ${interaction.query}
[${index + 1}] Trợ lý: ${interaction.response}`
).join('\n\n')}
  `;
}

const ChatController = {
  async processMessage(req, res) {
    try {
      const { message, chatId } = req.body;
      const studentId = req.user.id;
      
      let imageUrl = null;
      let extractedText = null;
      let combinedMessage = message || '';
      
      let conversationContext = {};
      
      if (req.file) {
        try {
       
          imageUrl = req.file.path;
          
        
          const [result] = await visionClient.textDetection(imageUrl);
          const detections = result.textAnnotations;
          
          if (detections && detections.length > 0) {
            extractedText = detections[0].description;
            
         
            if (extractedText) {
              combinedMessage = message 
                ? `${message}\n\nNội dung trích xuất từ ảnh:\n${extractedText}` 
                : `Nội dung trích xuất từ ảnh:\n${extractedText}`;
            }
          }
        } catch (ocrError) {
          console.error('Error processing image:', ocrError);
        }
      }
      
      // Nếu không có tin nhắn và không có nội dung OCR
      if (!combinedMessage && !imageUrl) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tin nhắn hoặc hình ảnh' });
      }
      
      // Tìm conversation dựa trên chatId nếu có
      let conversation = null;
      if (chatId) {
        conversation = await Conversation.findById(chatId);
      } else {
        conversation = await Conversation.findOne({ student: studentId })
          .sort({ createdAt: -1 });
      }
      
      // Nếu không tìm thấy conversation, tạo mới
      if (!conversation) {
        conversation = await Conversation.create({
          student: studentId,
          interactions: [],
          startTime: new Date()
        });
      }
      
      // Lấy lịch sử hội thoại và context
      let conversationHistory = '';
      
      if (conversation && conversation.interactions && conversation.interactions.length > 0) {
        conversationHistory = formatConversationHistory(conversation.interactions, 10);
        
        if (conversation.context) {
          conversationContext = conversation.context;
        }
      }
      
      // Xác định chủ đề của câu hỏi
      const relatedTopics = identifyTopics(combinedMessage);
      let topicGuidance = '';
      
      // Xác định chủ đề hiện tại
      let currentTopic = conversation.lastTopic || 'GENERAL';
      
      // Kiểm tra nếu tin nhắn là yêu cầu tiếp tục chủ đề hiện tại
      const continuePatterns = [
        'còn gì', 'nói thêm', 'mô tả thêm', 'mô tả hết', 'tiếp tục', 'chi tiết hơn',
        'thêm về', 'giải thích thêm', 'cung cấp thêm'
      ];
      
      const isContinueRequest = continuePatterns.some(pattern => 
        combinedMessage.toLowerCase().includes(pattern)
      );
      
      if (isContinueRequest && currentTopic !== 'GENERAL') {
        topicGuidance = `Người dùng muốn biết thêm về chủ đề "${currentTopic}". 
        Hãy tiếp tục cung cấp thông tin chi tiết hơn về chủ đề này.`;
      } else if (relatedTopics.includes('GENERAL')) {
        topicGuidance = 'Hãy trả lời câu hỏi dựa trên thông tin trong tài liệu.';
      } else {
        currentTopic = relatedTopics[0]; // Cập nhật chủ đề hiện tại
        topicGuidance = `Câu hỏi này liên quan đến các chủ đề: ${relatedTopics.join(', ')}. 
        Hãy tập trung vào các thông tin liên quan đến các chủ đề này trong tài liệu.`;
      }
      
      // Thêm logic để kiểm tra xem người dùng đã làm test chưa
      let hasTestResults = false;
      let testInfo = '';
      let majorInfo = '';
      
      try {
        // Tìm thông tin người dùng
        const user = await User.findById(studentId);
        if (user && user.testResults && user.testResults.length > 0) {
          // Lấy kết quả test gần nhất
          const latestTest = user.testResults[user.testResults.length - 1];
          
          // Tìm thông tin chi tiết về kết quả test
          const test = await Test.findById(latestTest.testId);
          if (test) {
            const resultDetail = test.results.find(r => r.type === latestTest.result);
            if (resultDetail) {
              testInfo = `
                Dựa trên kết quả bài test ${test.name} của bạn:
                - Kết quả: ${latestTest.result}
                - Mô tả: ${resultDetail.description}
              `;
              
              // Lấy thông tin về ngành học được đề xuất
              if (resultDetail.recommendedFPTMajors && resultDetail.recommendedFPTMajors.length > 0) {
                const majors = await Major.find({
                  _id: { $in: resultDetail.recommendedFPTMajors }
                });
                
                if (majors.length > 0) {
                  majorInfo = `
                    Các ngành học tại FPT phù hợp với bạn:
                    ${majors.map(major => `- ${major.name}: ${major.description}`).join('\n')}
                  `;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
      
      // Sử dụng Gemini để tạo câu trả lời
      const result = await model.generateContent(`
        Bạn là trợ lý tư vấn tuyển sinh của Đại học FPT tên là EduBot. 
        Hãy trả lời câu hỏi dựa trên thông tin sau đây về Đại học FPT.
        
        ${conversationHistory ? 
          'Đây là một tin nhắn tiếp theo trong cuộc hội thoại đang diễn ra. KHÔNG CHÀO LẠI người dùng hoặc tự giới thiệu lại.' : 
          'Đây là tin nhắn đầu tiên trong cuộc hội thoại. Hãy chào người dùng và giới thiệu bản thân là EduBot.'}
        
        ${topicGuidance}
        
        ### CHỦ ĐỀ HIỆN TẠI: ${currentTopic}
        
        ${conversationHistory}
        
        ${Object.keys(conversationContext).length > 0 ? `### CONTEXT:\n${JSON.stringify(conversationContext, null, 2)}` : ''}
        
        ${fptContent}
        
        ${testInfo ? 'Thông tin về người dùng (chỉ sử dụng khi câu hỏi liên quan đến tính cách, ngành học phù hợp, hoặc hướng nghiệp):\n' + testInfo : ''}
        ${majorInfo ? 'Thông tin về ngành học phù hợp (chỉ sử dụng khi câu hỏi liên quan đến lựa chọn ngành học):\n' + majorInfo : ''}
        
        ${extractedText ? '### NỘI DUNG TRÍCH XUẤT TỪ HÌNH ẢNH:\n' + extractedText : ''}
        
        Câu hỏi hiện tại: ${message || 'Phân tích nội dung trong hình ảnh'}
        
        HƯỚNG DẪN QUAN TRỌNG VỀ DUY TRÌ NGỮ CẢNH:
        1. Đọc kỹ lịch sử hội thoại và duy trì tính nhất quán với các câu trả lời trước đó
        2. Nếu người dùng hỏi tiếp về chủ đề hiện tại (${currentTopic}), tiếp tục cung cấp thông tin về chủ đề đó
        3. Nếu người dùng hỏi "còn gì nữa", "nói thêm đi", "mô tả thêm", hãy tiếp tục cung cấp thông tin về chủ đề cuối cùng
        4. Chỉ hỏi lại người dùng khi thực sự không hiểu họ muốn biết gì
        5. Nếu người dùng đang tìm hiểu về một chủ đề cụ thể, KHÔNG chuyển đề tài trừ khi họ rõ ràng hỏi về chủ đề khác
        
        ${isContinueRequest ? `
        NGƯỜI DÙNG ĐANG YÊU CẦU THÊM THÔNG TIN VỀ CHỦ ĐỀ ${currentTopic}:
        - TIẾP TỤC cung cấp thông tin chi tiết hơn về chủ đề này
        - KHÔNG hỏi lại người dùng muốn biết gì
        - KHÔNG liệt kê các chủ đề khác
        - Cung cấp thông tin MỚI mà chưa đề cập trong các câu trả lời trước
        ` : ''}
        
        ${imageUrl && !extractedText ? 'Người dùng đã gửi một hình ảnh nhưng không có văn bản nào được trích xuất. Hãy trả lời dựa trên tin nhắn của họ và cho biết rằng hình ảnh không chứa văn bản để phân tích.' : ''}
        
        HƯỚNG DẪN PHONG CÁCH TRẢ LỜI:
        1. Trả lời với giọng điệu thân thiện, nhiệt tình và chuyên nghiệp
        2. Sử dụng ngôn ngữ đơn giản, dễ hiểu, phù hợp với học sinh THPT
        3. Tránh sử dụng từ ngữ quá học thuật hoặc khó hiểu
        4. Trả lời chi tiết, cụ thể, có cấu trúc rõ ràng với các phần riêng biệt
        5. Thể hiện sự quan tâm đến nhu cầu cụ thể của người dùng
        6. Khi thích hợp, hãy đặt câu hỏi để hiểu rõ hơn nhu cầu của người dùng
        7. Luôn giữ thái độ tích cực và khuyến khích người dùng
        8. Sử dụng emoji phù hợp để tạo sự thân thiện (nhưng không quá nhiều)
        9. KHÔNG SỬ DỤNG dấu ** hoặc * để nhấn mạnh văn bản
        10. KHI LIỆT KÊ THÔNG TIN, LUÔN SỬ DỤNG DẤU GẠCH ĐẦU DÒNG (-) ĐỂ TẠO DANH SÁCH. ĐÂY LÀ YÊU CẦU BẮT BUỘC. MỖI MỤC LIỆT KÊ PHẢI BẮT ĐẦU BẰNG DẤU GẠCH NGANG (-).
        11. Khi cung cấp URL, chỉ sử dụng một trong hai định dạng sau:
            - URL thuần túy: https://example.com
            - URL với văn bản mô tả: [Văn bản mô tả](https://example.com)
            KHÔNG bao giờ kết hợp cả hai định dạng cùng lúc.
        
        HƯỚNG DẪN PHÂN TÍCH CÂU HỎI:
        1. Hãy tìm thông tin chính xác trong tài liệu liên quan đến câu hỏi.
        2. Nếu câu hỏi hoặc hình ảnh liên quan đến học phí, hãy cung cấp thông tin chi tiết về mức học phí theo ngành và campus.
        3. Nếu câu hỏi hoặc hình ảnh liên quan đến học bổng, hãy nêu rõ các loại học bổng và điều kiện.
        4. Nếu câu hỏi hoặc hình ảnh liên quan đến ngành học, hãy cung cấp thông tin chi tiết về ngành đó.
        5. Nếu câu hỏi hoặc hình ảnh liên quan đến tuyển sinh, hãy giải thích các phương thức xét tuyển.
        6. Nếu câu hỏi không rõ ràng, hãy đặt câu hỏi để làm rõ ý định của người dùng.
        7. Chỉ sử dụng thông tin được cung cấp trong tài liệu.
        8. Nếu không có thông tin để trả lời, hãy nói "Tôi không có thông tin về vấn đề này trong tài liệu."
        
        ${message && message.includes("phân tích") ? 'Người dùng yêu cầu phân tích chi tiết dựa trên bảng điểm. Hãy phân tích cụ thể điểm số theo khối tự nhiên và khối xã hội, đề xuất ngành học phù hợp dựa trên điểm mạnh của học sinh.' : ''}
        
        ${conversationHistory ? 'Hãy đảm bảo câu trả lời của bạn nhất quán với các câu trả lời trước đó trong lịch sử hội thoại.' : ''}
        ${testInfo || majorInfo ? 'Hãy cá nhân hóa câu trả lời dựa trên kết quả test và ngành học phù hợp của người dùng nếu có liên quan.' : ''}
      `);
      
      const responseText = result.response.text();
     
      const response = cleanupResponse(responseText);
      
      // Lưu hội thoại vào database
      try {
        conversation.interactions.push({
          query: message || (extractedText ? `[Hình ảnh có nội dung]: ${extractedText.substring(0, 50)}...` : '[Hình ảnh]'),
          response,
          timestamp: new Date(),
          imageUrl: imageUrl
        });
        
       
        if (relatedTopics.length > 0 && !relatedTopics.includes('GENERAL')) {
          conversation.lastTopic = relatedTopics[0];
        } else if (isContinueRequest) {
          // Giữ nguyên chủ đề nếu là yêu cầu tiếp tục
          conversation.lastTopic = currentTopic;
        }
        
     
        conversation.context = {
          ...conversationContext,
          currentTopic: conversation.lastTopic,
          lastQuery: message,
          continuationCount: isContinueRequest ? (conversationContext.continuationCount || 0) + 1 : 0
        };
        
        await conversation.save();
      } catch (dbError) {
        console.error('Error saving conversation:', dbError);
      }
      
      res.json({ 
        response,
        extractedText,
        imageUrl,
        chatId: conversation._id
      });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getConversationHistory(req, res) {
    try {
      const studentId = req.user.id;
      
      // Lấy tất cả các cuộc hội thoại của người dùng, sắp xếp theo thời gian tạo giảm dần
      const conversations = await Conversation.find({ student: studentId })
        .sort({ createdAt: -1 });
      
      if (!conversations || conversations.length === 0) {
        return res.status(404).json({ 
          message: 'Chưa có lịch sử chat nào',
          conversations: [] 
        });
      }
      
      res.status(200).json({
        conversations
      });
    } catch (error) {
      console.error('Error getting conversation history:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getConversationHistoryById(req, res) {
    try {
      const { studentId } = req.params;
      
      // Kiểm tra quyền truy cập (chỉ admin mới có quyền xem lịch sử của người khác)
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Không có quyền truy cập' });
      }
      
      const conversation = await Conversation.findOne({ student: studentId })
        .sort({ createdAt: -1 });
      
      if (!conversation) {
        return res.status(404).json({ 
          message: 'Chưa có lịch sử chat nào',
          conversations: [] 
        });
      }
      
      res.status(200).json({
        conversation
      });
    } catch (error) {
      console.error('Error getting conversation history by ID:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getAllConversations(req, res) {
    try {
      // Chỉ admin mới có quyền xem tất cả lịch sử
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Không có quyền truy cập' });
      }
      
      const { page = 1, limit = 10 } = req.query;
      
      const conversations = await Conversation.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('student', 'fullName email');
      
      const total = await Conversation.countDocuments();
      
      res.status(200).json({
        conversations,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error getting all conversations:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async createNewConversation(req, res) {
    try {
      const studentId = req.user.id;
      
      // Tạo cuộc hội thoại mới
      const newConversation = await Conversation.create({
        student: studentId,
        interactions: [],
        startTime: new Date()
      });
      
      res.status(201).json({
        message: 'Đã tạo đoạn chat mới thành công',
        conversation: newConversation,
        chatId: newConversation._id
      });
    } catch (error) {
      console.error('Error creating new conversation:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getConversationById(req, res) {
    try {
      const studentId = req.user.id;
      const { chatId } = req.params;
      
      
      const conversation = await Conversation.findOne({
        _id: chatId,
        student: studentId
      });
      
      if (!conversation) {
        return res.status(404).json({ error: 'Không tìm thấy cuộc trò chuyện' });
      }
      
      res.status(200).json({
        conversation
      });
    } catch (error) {
      console.error('Error getting conversation by ID:', error);
      res.status(500).json({ error: error.message });
    }
  },


  async deleteConversationById(req, res) {
    try {
      const studentId = req.user.id;
      const { chatId } = req.params;
      
    
      const result = await Conversation.findOneAndDelete({
        _id: chatId,
        student: studentId
      });
      
      if (!result) {
        return res.status(404).json({ error: 'Không tìm thấy cuộc trò chuyện' });
      }
      
      res.status(200).json({
        message: 'Đã xóa cuộc trò chuyện thành công'
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ChatController;