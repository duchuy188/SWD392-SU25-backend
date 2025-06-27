// src/config/swagger/api/major.api.js
/**
 * @swagger
 * tags:
 *   name: Majors
 *   description: API để quản lý ngành học
 */

/**
 * @swagger
 * /api/majors:
 *   get:
 *     summary: Lấy danh sách ngành học với phân trang, tìm kiếm và lọc
 *     tags: [Majors]
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
 *           default: 9
 *         description: Số lượng item trên mỗi trang
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo tên, mô tả, khoa hoặc mã ngành
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Lọc theo khoa/phòng ban
 *       - in: query
 *         name: subjects
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Lọc theo môn học liên quan
 *       - in: query
 *         name: campus
 *         schema:
 *           type: string
 *           enum: [HANOI, HCMC, DANANG, CANTHO, QNHON]
 *         description: Lọc theo campus
 *       - in: query
 *         name: includeFilters
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Bao gồm thông tin bộ lọc trong response
 *       - in: query
 *         name: quickSearch
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Tìm kiếm nhanh với định dạng kết quả đơn giản
 *     responses:
 *       200:
 *         description: Danh sách ngành học hoặc kết quả tìm kiếm nhanh
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MajorListResponseWithFilters'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/MajorSearchResult'
 *       400:
 *         description: Thiếu từ khóa tìm kiếm (khi sử dụng quickSearch)
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/majors/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết về một ngành học
 *     tags: [Majors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ngành học
 *     responses:
 *       200:
 *         description: Thông tin chi tiết ngành học
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Major'
 *       404:
 *         description: Không tìm thấy ngành học
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/majors/admin:
 *   get:
 *     summary: Lấy danh sách ngành học cho admin (có phân trang, tìm kiếm và lọc)
 *     tags: [Majors]
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
 *         description: Số lượng item trên mỗi trang
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Lọc theo khoa/phòng ban
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: name
 *         description: Trường để sắp xếp
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Thứ tự sắp xếp
 *     responses:
 *       200:
 *         description: Danh sách ngành học
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminMajorListResponse'
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/majors:
 *   post:
 *     summary: Thêm mới một ngành học 
 *     tags: [Majors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               majorImage:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh đại diện cho ngành học
 *               name:
 *                 type: string
 *                 description: Tên ngành học
 *               department:
 *                 type: string
 *                 description: Khoa/phòng ban
 *               description:
 *                 type: string
 *                 description: Mô tả chi tiết về ngành học
 *               shortDescription:
 *                 type: string
 *                 description: Mô tả ngắn gọn về ngành học
 *               code:
 *                 type: string
 *                 description: Mã ngành học
 *               totalCredits:
 *                 type: number
 *                 description: Tổng số tín chỉ
 *               tuition:
 *                 type: object
 *                 description: Học phí
 *               tuitionByCampus:
 *                 type: object
 *                 description: Học phí theo campus
 *               requiredSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Kỹ năng yêu cầu
 *               advantages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lợi thế của ngành
 *               availableAt:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các campus có ngành này
 *               admissionCriteria:
 *                 type: string
 *                 description: Tiêu chí tuyển sinh
 *               programStructure:
 *                 type: object
 *                 description: Cấu trúc chương trình học
 *               careerProspects:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: Triển vọng nghề nghiệp
 *               subjectCombinations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tổ hợp môn
 *               isNewProgram:
 *                 type: boolean
 *                 description: Có phải là chương trình mới
 *               scholarships:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: Học bổng
 *     responses:
 *       201:
 *         description: Ngành học đã được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Major'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/majors/{id}:
 *   put:
 *     summary: Cập nhật thông tin ngành học 
 *     tags: [Majors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ngành học
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               majorImage:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh đại diện cho ngành học (không bắt buộc)
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               code:
 *                 type: string
 *               totalCredits:
 *                 type: number
 *               tuition:
 *                 type: object
 *               tuitionByCampus:
 *                 type: object
 *               requiredSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               advantages:
 *                 type: array
 *                 items:
 *                   type: string
 *               availableAt:
 *                 type: array
 *                 items:
 *                   type: string
 *               admissionCriteria:
 *                 type: string
 *               programStructure:
 *                 type: object
 *               careerProspects:
 *                 type: array
 *                 items:
 *                   type: object
 *               subjectCombinations:
 *                 type: array
 *                 items:
 *                   type: string
 *               isNewProgram:
 *                 type: boolean
 *               scholarships:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Ngành học đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Major'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy ngành học
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/majors/{id}:
 *   delete:
 *     summary: Xóa một ngành học
 *     tags: [Majors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của ngành học
 *     responses:
 *       200:
 *         description: Ngành học đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy ngành học
 *       500:
 *         description: Lỗi server
 */