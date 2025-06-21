/**
 * @swagger
 * components:
 *   schemas:
 *     Interaction:
 *       type: object
 *       properties:
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Thời gian tương tác
 *         query:
 *           type: string
 *           description: Câu hỏi của người dùng
 *         response:
 *           type: string
 *           description: Câu trả lời của chatbot
 *         imageUrl:
 *           type: string
 *           description: URL của hình ảnh được tải lên (nếu có)
 *       example:
 *         timestamp: "2023-06-19T10:30:00Z"
 *         query: "Ngành Kỹ thuật phần mềm học những gì?"
 *         response: "Ngành Kỹ thuật phần mềm tại FPT đào tạo sinh viên về phát triển phần mềm..."
 *         imageUrl: "https://res.cloudinary.com/example/image/upload/v1623123456/chat-images/example.jpg"
 * 
 *     Conversation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của cuộc hội thoại
 *         student:
 *           type: string
 *           description: ID của học sinh
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Thời gian bắt đầu cuộc hội thoại
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: Thời gian kết thúc cuộc hội thoại
 *         interactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Interaction'
 *           description: Danh sách các tương tác trong cuộc hội thoại
 *         lastTopic:
 *           type: string
 *           description: Chủ đề cuối cùng được thảo luận
 *       example:
 *         _id: "60d21b4667d0d8992e610c85"
 *         student: "60d21b4667d0d8992e610c86"
 *         startTime: "2023-06-19T10:30:00Z"
 *         interactions: [
 *           {
 *             timestamp: "2023-06-19T10:30:00Z",
 *             query: "Ngành Kỹ thuật phần mềm học những gì?",
 *             response: "Ngành Kỹ thuật phần mềm tại FPT đào tạo sinh viên về phát triển phần mềm..."
 *           }
 *         ]
 *         lastTopic: "Ngành học"
 * 
 *     ConversationResponse:
 *       type: object
 *       properties:
 *         conversation:
 *           $ref: '#/components/schemas/Conversation'
 *       example:
 *         conversation:
 *           _id: "60d21b4667d0d8992e610c85"
 *           student: "60d21b4667d0d8992e610c86"
 *           startTime: "2023-06-19T10:30:00Z"
 *           interactions: [
 *             {
 *               timestamp: "2023-06-19T10:30:00Z",
 *               query: "Ngành Kỹ thuật phần mềm học những gì?",
 *               response: "Ngành Kỹ thuật phần mềm tại FPT đào tạo sinh viên về phát triển phần mềm..."
 *             }
 *           ]
 *           lastTopic: "Ngành học"
 * 
 *     ConversationsListResponse:
 *       type: object
 *       properties:
 *         conversations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Conversation'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Tổng số cuộc hội thoại
 *             page:
 *               type: integer
 *               description: Trang hiện tại
 *             pages:
 *               type: integer
 *               description: Tổng số trang
 *             limit:
 *               type: integer
 *               description: Số lượng kết quả mỗi trang
 *       example:
 *         conversations:
 *           - _id: "60d21b4667d0d8992e610c85"
 *             student:
 *               _id: "60d21b4667d0d8992e610c86"
 *               fullName: "Nguyễn Văn A"
 *               email: "student@example.com"
 *             startTime: "2023-06-19T10:30:00Z"
 *             interactions:
 *               - timestamp: "2023-06-19T10:30:00Z"
 *                 query: "Ngành Kỹ thuật phần mềm học những gì?"
 *                 response: "Ngành Kỹ thuật phần mềm tại FPT đào tạo sinh viên về phát triển phần mềm..."
 *             lastTopic: "Ngành học"
 *         pagination:
 *           total: 50
 *           page: 1
 *           pages: 5
 *           limit: 10
 * 
 *     NewConversationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Thông báo thành công
 *         conversation:
 *           $ref: '#/components/schemas/Conversation'
 *         chatId:
 *           type: string
 *           description: ID của cuộc trò chuyện mới
 *       example:
 *         message: "Đã tạo đoạn chat mới thành công"
 *         conversation: {
 *           _id: "60d21b4667d0d8992e610c85",
 *           student: "60d21b4667d0d8992e610c86",
 *           startTime: "2023-06-19T10:30:00Z",
 *           interactions: []
 *         }
 *         chatId: "60d21b4667d0d8992e610c85"
 */