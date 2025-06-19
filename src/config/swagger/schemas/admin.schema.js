/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Thông báo lỗi
 *       example:
 *         error: "Đã xảy ra lỗi khi xử lý yêu cầu"
 *
 *     UserListResponse:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserBasic'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Tổng số người dùng
 *             page:
 *               type: integer
 *               description: Trang hiện tại
 *             limit:
 *               type: integer
 *               description: Số lượng kết quả mỗi trang
 *             pages:
 *               type: integer
 *               description: Tổng số trang
 *         filters:
 *           type: object
 *           properties:
 *             search:
 *               type: string
 *               nullable: true
 *               description: Từ khóa tìm kiếm
 *             role:
 *               type: string
 *               enum: [student, admin]
 *               nullable: true
 *               description: Vai trò đã lọc
 *             isActive:
 *               type: boolean
 *               nullable: true
 *               description: Trạng thái kích hoạt đã lọc
 *         sorting:
 *           type: object
 *           properties:
 *             sortBy:
 *               type: string
 *               description: Trường sắp xếp
 *             sortOrder:
 *               type: string
 *               enum: [asc, desc]
 *               description: Thứ tự sắp xếp
 *
 *     UserBasic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID của người dùng
 *         email:
 *           type: string
 *           format: email
 *           description: Email của người dùng
 *         fullName:
 *           type: string
 *           description: Tên đầy đủ
 *         role:
 *           type: string
 *           enum: [student, admin]
 *           description: Vai trò
 *         profilePicture:
 *           type: string
 *           nullable: true
 *           description: URL ảnh đại diện
 *         isActive:
 *           type: boolean
 *           description: Trạng thái kích hoạt
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo tài khoản
 *
 *     UserDetailResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserBasic'
 *         studentInfo:
 *           type: object
 *           nullable: true
 *           description: Thông tin sinh viên (chỉ có nếu role là student)
 *           properties:
 *             grade:
 *               type: integer
 *               nullable: true
 *               description: Lớp
 *             academicResults:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subject:
 *                     type: string
 *                   score:
 *                     type: number
 *                   semester:
 *                     type: integer
 *             interests:
 *               type: array
 *               items:
 *                 type: string
 *             personalityType:
 *               type: string
 *               nullable: true
 *             preferredFPTMajors:
 *               type: array
 *               items:
 *                 type: string
 *             testResults:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   test:
 *                     type: string
 *                   score:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *
 *     UpdateUserStatusRequest:
 *       type: object
 *       required:
 *         - isActive
 *       properties:
 *         isActive:
 *           type: boolean
 *           description: Trạng thái kích hoạt (true = mở ban, false = ban)
 *
 *     UpdateUserStatusResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Thông báo kết quả
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             fullName:
 *               type: string
 *             role:
 *               type: string
 *             isActive:
 *               type: boolean
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - email
 *         - fullName
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email của người dùng
 *         fullName:
 *           type: string
 *           description: Tên đầy đủ
 *         password:
 *           type: string
 *           format: password
 *           description: Mật khẩu
 *         phone:
 *           type: string
 *           description: Số điện thoại
 *         address:
 *           type: string
 *           description: Địa chỉ
 *         role:
 *           type: string
 *           enum: [student, admin]
 *           default: student
 *           description: Vai trò
 *
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Tạo người dùng thành công
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             fullName:
 *               type: string
 *             role:
 *               type: string
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: Tên đầy đủ
 *         phone:
 *           type: string
 *           description: Số điện thoại
 *         address:
 *           type: string
 *           description: Địa chỉ
 *         role:
 *           type: string
 *           enum: [student, admin]
 *           description: Vai trò
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Cập nhật thông tin người dùng thành công
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             fullName:
 *               type: string
 *             phone:
 *               type: string
 *             address:
 *               type: string
 *             role:
 *               type: string
 */