/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API quản lý chat với AI
 */

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Gửi tin nhắn hoặc hình ảnh đến chatbot
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Nội dung tin nhắn (tùy chọn nếu có hình ảnh)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh để phân tích (tùy chọn nếu có tin nhắn)
 *     responses:
 *       200:
 *         description: Phản hồi từ chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Câu trả lời từ chatbot
 *                 extractedText:
 *                   type: string
 *                   description: Văn bản được trích xuất từ hình ảnh (nếu có)
 *                 imageUrl:
 *                   type: string
 *                   description: URL của hình ảnh đã tải lên (nếu có)
 *       400:
 *         description: Yêu cầu không hợp lệ - Không có tin nhắn hoặc hình ảnh
 *       401:
 *         description: Không được xác thực
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/new:
 *   post:
 *     summary: Tạo đoạn chat mới
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Đã tạo đoạn chat mới thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewConversationResponse'
 *       401:
 *         description: Không được xác thực
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/history:
 *   get:
 *     summary: Lấy lịch sử chat của người dùng hiện tại
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lịch sử chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conversation'
 *       401:
 *         description: Không được xác thực
 *       404:
 *         description: Không tìm thấy lịch sử chat
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/history/{studentId}:
 *   get:
 *     summary: Lấy lịch sử chat của học sinh theo ID (chỉ dành cho admin)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của học sinh
 *     responses:
 *       200:
 *         description: Lịch sử chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversationResponse'
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy lịch sử chat
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/all:
 *   get:
 *     summary: Lấy tất cả lịch sử chat (chỉ dành cho admin)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng kết quả mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách lịch sử chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversationsListResponse'
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/{chatId}:
 *   get:
 *     summary: Lấy cuộc trò chuyện theo ID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cuộc trò chuyện
 *     responses:
 *       200:
 *         description: Chi tiết cuộc trò chuyện
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversationResponse'
 *       401:
 *         description: Không được xác thực
 *       404:
 *         description: Không tìm thấy cuộc trò chuyện
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/chat/{chatId}:
 *   delete:
 *     summary: Xóa cuộc trò chuyện theo ID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cuộc trò chuyện
 *     responses:
 *       200:
 *         description: Xóa cuộc trò chuyện thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xóa cuộc trò chuyện thành công
 *       401:
 *         description: Không được xác thực
 *       404:
 *         description: Không tìm thấy cuộc trò chuyện
 *       500:
 *         description: Lỗi server
 */