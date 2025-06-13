/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fullName
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động tạo của MongoDB
 *         email:
 *           type: string
 *           format: email
 *           description: Email của người dùng (dùng làm tên đăng nhập)
 *         password:
 *           type: string
 *           format: password
 *           description: Mật khẩu đã được mã hóa
 *         fullName:
 *           type: string
 *           description: Họ tên đầy đủ của người dùng
 *         phone:
 *           type: string
 *           description: Số điện thoại của người dùng
 *         address:
 *           type: string
 *           description: Địa chỉ của người dùng
 *         role:
 *           type: string
 *           enum: [student, admin]
 *           default: student
 *           description: Vai trò của người dùng
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo tài khoản
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         email: student@example.com
 *         fullName: Nguyễn Văn A
 *         phone: "0912345678"
 *         address: "Hà Nội, Việt Nam"
 *         role: student
 *         createdAt: 2023-11-20T08:30:00Z
 * 
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         role:
 *           type: string
 *         studentId:
 *           type: string
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         email: student@example.com
 *         fullName: Nguyễn Văn A
 *         phone: "0912345678"
 *         address: "Hà Nội, Việt Nam"
 *         role: student
 *         studentId: 60d21b4667d0d8992e610c86
 * 
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: student@example.com
 *         password: password123
 * 
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fullName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 *           description: Số điện thoại (tùy chọn)
 *         address:
 *           type: string
 *           description: Địa chỉ (tùy chọn)
 *       example:
 *         email: student@example.com
 *         password: password123
 *         fullName: Nguyễn Văn A
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *       example:
 *         message: Đăng nhập thành công
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           id: 60d21b4667d0d8992e610c85
 *           email: student@example.com
 *           fullName: Nguyễn Văn A
 *           phone: "0912345678"
 *           address: "Hà Nội, Việt Nam"
 *           role: student
 *           studentId: 60d21b4667d0d8992e610c86
 * 
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *         newPassword:
 *           type: string
 *           format: password
 *       example:
 *         currentPassword: password123
 *         newPassword: newPassword456
 * 
 *     AdminResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         fullName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin]
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         email: admin@example.com
 *         fullName: Admin User
 *         role: admin
 * 
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *       example:
 *         message: Đăng ký thành công
 *         user:
 *           id: 60d21b4667d0d8992e610c85
 *           email: student@example.com
 *           fullName: Nguyễn Văn A
 *           role: student
 *           studentId: 60d21b4667d0d8992e610c86
 */