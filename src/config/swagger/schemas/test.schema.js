/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - questions
 *       properties:
 *         _id:
 *           type: string
 *           description: ID tự động tạo của MongoDB
 *         name:
 *           type: string
 *           description: Tên bài test
 *         type:
 *           type: string
 *           enum: [PERSONALITY, CAREER, ACADEMIC]
 *           description: Loại bài test
 *         description:
 *           type: string
 *           description: Mô tả về bài test
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: Nội dung câu hỏi
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Các lựa chọn trả lời
 *               weight:
 *                 type: number
 *                 description: Trọng số của câu hỏi
 *               category:
 *                 type: string
 *                 description: Phân loại câu hỏi (ví dụ R,I,A,S,E,C cho Holland)
 *         results:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Loại kết quả (ví dụ INTJ, Realistic)
 *               description:
 *                 type: string
 *                 description: Mô tả về loại kết quả
 *               recommendedMajors:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID của các ngành học được đề xuất
 *               recommendedFPTMajors:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID của các ngành học tại FPT được đề xuất
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         name: "Bài test tính cách MBTI"
 *         type: "PERSONALITY"
 *         description: "Bài test giúp xác định 16 loại tính cách theo MBTI"
 *         questions: [
 *           {
 *             question: "Bạn thích làm việc một mình hay theo nhóm?",
 *             options: ["Làm việc theo nhóm", "Làm việc một mình"],
 *             weight: 1,
 *             category: "E-I"
 *           }
 *         ]
 *         results: [
 *           {
 *             type: "INTJ",
 *             description: "Kiến trúc sư - Người có tư duy chiến lược với kế hoạch dài hạn",
 *             recommendedMajors: ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c87"],
 *             recommendedFPTMajors: ["60d21b4667d0d8992e610c88"]
 *           }
 *         ]
 * 
 *     TestListResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         description:
 *           type: string
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         name: "Bài test tính cách MBTI"
 *         type: "PERSONALITY"
 *         description: "Bài test giúp xác định 16 loại tính cách theo MBTI"
 * 
 *     TestSubmitRequest:
 *       type: object
 *       required:
 *         - answers
 *       properties:
 *         answers:
 *           type: array
 *           items:
 *             type: number
 *           description: Mảng các câu trả lời (0, 1, 2, 3, 4) tương ứng với từng câu hỏi
 *       example:
 *         answers: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
 * 
 *     TestResultResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: Kết quả bài test (ví dụ INTJ, Realistic)
 *         description:
 *           type: string
 *           description: Mô tả về kết quả
 *         recommendedMajors:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID các ngành học được đề xuất
 *         recommendedFPTMajors:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID các ngành học tại FPT được đề xuất
 *       example:
 *         result: "INTJ"
 *         description: "Kiến trúc sư - Người có tư duy chiến lược với kế hoạch dài hạn"
 *         recommendedMajors: ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c87"]
 *         recommendedFPTMajors: ["60d21b4667d0d8992e610c88"]
 * 
 *     UserTestResultsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           testId:
 *             type: string
 *             description: ID của bài test
 *           testName:
 *             type: string
 *             description: Tên bài test
 *           testType:
 *             type: string
 *             description: Loại bài test
 *           result:
 *             type: string
 *             description: Kết quả bài test
 *           score:
 *             type: object
 *             description: Điểm số chi tiết
 *           date:
 *             type: string
 *             format: date-time
 *             description: Ngày làm bài test
 *       example:
 *         - testId: "60d21b4667d0d8992e610c85"
 *           testName: "Bài test tính cách MBTI"
 *           testType: "PERSONALITY"
 *           result: "INTJ"
 *           score: { "e": 2, "i": 8, "s": 3, "n": 7, "t": 9, "f": 1, "j": 8, "p": 2 }
 *           date: "2023-11-20T08:30:00Z"
 *         - testId: "60d21b4667d0d8992e610c89"
 *           testName: "Bài test định hướng nghề nghiệp Holland"
 *           testType: "CAREER"
 *           result: "Realistic"
 *           score: { "Realistic": 25, "Investigative": 15, "Artistic": 10, "Social": 8, "Enterprising": 12, "Conventional": 18 }
 *           date: "2023-11-21T10:15:00Z"
 * 
 *     DetailedTestResultResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của kết quả bài test
 *         testId:
 *           type: string
 *           description: ID của bài test
 *         testName:
 *           type: string
 *           description: Tên bài test
 *         testType:
 *           type: string
 *           description: Loại bài test
 *         result:
 *           type: string
 *           description: Kết quả bài test (ví dụ INTJ, Realistic)
 *         score:
 *           type: object
 *           description: Điểm số chi tiết của bài test
 *         date:
 *           type: string
 *           format: date-time
 *           description: Ngày làm bài test
 *         description:
 *           type: string
 *           description: Mô tả chi tiết về kết quả bài test
 *         recommendedMajors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *           description: Danh sách các ngành học được đề xuất
 *         recommendedFPTMajors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *           description: Danh sách các ngành học tại FPT được đề xuất
 *       example:
 *         _id: "60d21b4667d0d8992e610c90"
 *         testId: "60d21b4667d0d8992e610c85"
 *         testName: "Bài test tính cách MBTI"
 *         testType: "PERSONALITY"
 *         result: "INTJ"
 *         score: { "e": 2, "i": 8, "s": 3, "n": 7, "t": 9, "f": 1, "j": 8, "p": 2 }
 *         date: "2023-11-20T08:30:00Z"
 *         description: "Kiến trúc sư - Người có tư duy chiến lược với kế hoạch dài hạn. Bạn có khả năng phân tích và lập kế hoạch tốt, thường đặt ra các mục tiêu dài hạn và làm việc một cách có hệ thống để đạt được chúng."
 *         recommendedMajors: [
 *           { id: "60d21b4667d0d8992e610c86", name: "Khoa học máy tính", code: "CS" },
 *           { id: "60d21b4667d0d8992e610c87", name: "Kỹ thuật phần mềm", code: "SE" }
 *         ]
 *         recommendedFPTMajors: [
 *           { id: "60d21b4667d0d8992e610c88", name: "Kỹ thuật phần mềm", code: "SE" }
 *         ]
 */