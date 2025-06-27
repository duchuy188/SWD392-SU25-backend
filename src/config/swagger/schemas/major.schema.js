// src/config/swagger/schemas/major.schema.js
/**
 * @swagger
 * components:
 *   schemas:
 *     Major:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của ngành học
 *         name:
 *           type: string
 *           description: Tên ngành học
 *         department:
 *           type: string
 *           description: Khoa/phòng ban
 *         tuition:
 *           type: object
 *           properties:
 *             firstSem:
 *               type: number
 *               description: Học phí học kỳ đầu
 *             midSem:
 *               type: number
 *               description: Học phí học kỳ giữa
 *             lastSem:
 *               type: number
 *               description: Học phí học kỳ cuối
 *         isNewProgram:
 *           type: boolean
 *           description: Có phải là chương trình mới
 *         description:
 *           type: string
 *           description: Mô tả chi tiết về ngành học
 *         shortDescription:
 *           type: string
 *           description: Mô tả ngắn gọn về ngành học
 *         code:
 *           type: string
 *           description: Mã ngành học
 *         totalCredits:
 *           type: number
 *           description: Tổng số tín chỉ
 *         programStructure:
 *           type: object
 *           properties:
 *             preparation:
 *               type: object
 *               properties:
 *                 duration:
 *                   type: string
 *                 objectives:
 *                   type: array
 *                   items:
 *                     type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: string
 *             basic:
 *               type: object
 *               properties:
 *                 duration:
 *                   type: string
 *                 objectives:
 *                   type: array
 *                   items:
 *                     type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: string
 *             ojt:
 *               type: object
 *               properties:
 *                 duration:
 *                   type: string
 *                 objectives:
 *                   type: array
 *                   items:
 *                     type: string
 *             specialization:
 *               type: object
 *               properties:
 *                 duration:
 *                   type: string
 *                 objectives:
 *                   type: array
 *                   items:
 *                     type: string
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: string
 *             graduation:
 *               type: object
 *               properties:
 *                 duration:
 *                   type: string
 *                 objectives:
 *                   type: array
 *                   items:
 *                     type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *         careerProspects:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *         requiredSkills:
 *           type: array
 *           items:
 *             type: string
 *         advantages:
 *           type: array
 *           items:
 *             type: string
 *         availableAt:
 *           type: array
 *           items:
 *             type: string
 *             enum: [HANOI, HCMC, DANANG, CANTHO, QNHON]
 *         internationalPartners:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               universities:
 *                 type: array
 *                 items:
 *                   type: string
 *         admissionCriteria:
 *           type: string
 *         subjectCombinations:
 *           type: array
 *           items:
 *             type: string
 *         imageUrl:
 *           type: string
 *           description: URL hình ảnh đại diện
 *         scholarships:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               value:
 *                 type: string
 *         tuitionByCampus:
 *           type: object
 *           properties:
 *             HANOI:
 *               type: object
 *               properties:
 *                 firstSem:
 *                   type: number
 *                 midSem:
 *                   type: number
 *                 lastSem:
 *                   type: number
 *             HCMC:
 *               type: object
 *               properties:
 *                 firstSem:
 *                   type: number
 *                 midSem:
 *                   type: number
 *                 lastSem:
 *                   type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "60d21b4667d0d8992e610c85"
 *         name: "Kỹ thuật phần mềm"
 *         department: "Công nghệ thông tin"
 *         tuition:
 *           firstSem: 31600000
 *           midSem: 33600000
 *           lastSem: 35800000
 *         isNewProgram: false
 *         description: "Ngành Kỹ thuật phần mềm đào tạo các kỹ sư phát triển phần mềm chuyên nghiệp, có khả năng thiết kế, xây dựng, kiểm thử và bảo trì các hệ thống phần mềm quy mô lớn."
 *         shortDescription: "Ngành học về lập trình, thiết kế và phát triển phần mềm."
 *         code: "SE"
 *         totalCredits: 144
 *         imageUrl: "https://res.cloudinary.com/example/image/upload/major-images/software-engineering.jpg"
 *
 *     MajorListResponse:
 *       type: object
 *       properties:
 *         majors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               relatedSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *               department:
 *                 type: string
 *               universityCount:
 *                 type: integer
 *               isNewProgram:
 *                 type: boolean
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *         totalItems:
 *           type: integer
 *
 *     MajorSearchResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         department:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *         code:
 *           type: string
 *
 *     FiltersResponse:
 *       type: object
 *       properties:
 *         departments:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách khoa/phòng ban
 *         subjects:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách môn học liên quan
 *         campuses:
 *           type: array
 *           items:
 *             type: string
 *             enum: [HANOI, HCMC, DANANG, CANTHO, QNHON]
 *           description: Danh sách campus
 *
 *     MajorListResponseWithFilters:
 *       type: object
 *       properties:
 *         majors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MajorListItem'
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *         totalItems:
 *           type: integer
 *         filters:
 *           type: object
 *           properties:
 *             departments:
 *               type: array
 *               items:
 *                 type: string
 *             subjects:
 *               type: array
 *               items:
 *                 type: string
 *             campuses:
 *               type: array
 *               items:
 *                 type: string
 */