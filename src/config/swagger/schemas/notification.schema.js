/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationToken:
 *       type: object
 *       required:
 *         - userId
 *         - token
 *         - deviceType
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động tạo của MongoDB
 *         userId:
 *           type: string
 *           description: ID của người dùng
 *         token:
 *           type: string
 *           description: Token thiết bị FCM
 *         deviceType:
 *           type: string
 *           enum: [android, ios, web]
 *           description: Loại thiết bị
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo token
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         userId: 60d21b4667d0d8992e610c86
 *         token: fMEhkj5STGaadYnr8XLmQB:APA91bHQmQHXLBGRMfHXiZABCDEFGHIJKLMNOPQRSTUVWXYZ
 *         deviceType: android
 *         createdAt: 2023-11-20T08:30:00Z
 * 
 *     RegisterTokenRequest:
 *       type: object
 *       required:
 *         - token
 *         - deviceType
 *       properties:
 *         token:
 *           type: string
 *           description: Token thiết bị FCM
 *         deviceType:
 *           type: string
 *           enum: [android, ios, web]
 *           description: Loại thiết bị
 *       example:
 *         token: fMEhkj5STGaadYnr8XLmQB:APA91bHQmQHXLBGRMfHXiZABCDEFGHIJKLMNOPQRSTUVWXYZ
 *         deviceType: android
 * 
 *     UnregisterTokenRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Token thiết bị FCM cần hủy
 *       example:
 *         token: fMEhkj5STGaadYnr8XLmQB:APA91bHQmQHXLBGRMfHXiZABCDEFGHIJKLMNOPQRSTUVWXYZ
 * 
 *     SendNotificationToUserRequest:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         userId:
 *           type: string
 *           description: ID của người dùng nhận thông báo
 *         title:
 *           type: string
 *           description: Tiêu đề thông báo
 *         body:
 *           type: string
 *           description: Nội dung thông báo
 *         data:
 *           type: object
 *           description: Dữ liệu bổ sung cho thông báo
 *       example:
 *         userId: 60d21b4667d0d8992e610c86
 *         title: Thông báo mới
 *         body: Bạn có một tin nhắn mới
 *         data: { type: "message", chatId: "60d21b4667d0d8992e610c87" }
 * 
 *     SendNotificationToManyRequest:
 *       type: object
 *       required:
 *         - userIds
 *         - title
 *         - body
 *       properties:
 *         userIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID người dùng nhận thông báo
 *         title:
 *           type: string
 *           description: Tiêu đề thông báo
 *         body:
 *           type: string
 *           description: Nội dung thông báo
 *         data:
 *           type: object
 *           description: Dữ liệu bổ sung cho thông báo
 *       example:
 *         userIds: ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c88"]
 *         title: Thông báo mới
 *         body: Có bài test mới được thêm vào hệ thống
 *         data: { type: "test", testId: "60d21b4667d0d8992e610c89" }
 * 
 *     SendNotificationToAllRequest:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: Tiêu đề thông báo
 *         body:
 *           type: string
 *           description: Nội dung thông báo
 *         data:
 *           type: object
 *           description: Dữ liệu bổ sung cho thông báo
 *       example:
 *         title: Thông báo hệ thống
 *         body: Hệ thống sẽ bảo trì vào ngày 15/07/2023
 *         data: { type: "system", importance: "high" }
 * 
 *     NotificationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Thông báo kết quả
 *         success:
 *           type: integer
 *           description: Số lượng thông báo gửi thành công
 *         failure:
 *           type: integer
 *           description: Số lượng thông báo gửi thất bại
 *         totalTokens:
 *           type: integer
 *           description: Tổng số tokens được xử lý
 *       example:
 *         message: Thông báo đã được gửi
 *         success: 3
 *         failure: 1
 *         totalTokens: 4
 */