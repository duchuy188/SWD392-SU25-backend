/**
 * @swagger
 * tags:
 *   name: Tests
 *   description: API quản lý bài test tâm lý
 */

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Lấy danh sách bài test
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Danh sách bài test
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestListResponse'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/tests/{id}:
 *   get:
 *     summary: Lấy chi tiết bài test theo ID
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài test
 *     responses:
 *       200:
 *         description: Chi tiết bài test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy bài test
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/tests/{id}/submit:
 *   post:
 *     summary: Nộp bài làm test
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của bài test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestSubmitRequest'
 *     responses:
 *       200:
 *         description: Kết quả bài test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestResultResponse'
 *       401:
 *         description: Không có quyền truy cập
 *       403:
 *         description: Chỉ học sinh mới được phép làm bài test
 *       404:
 *         description: Không tìm thấy bài test
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/tests/my-results:
 *   get:
 *     summary: Lấy kết quả test của người dùng 
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách kết quả test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTestResultsResponse'
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/tests/results/{resultId}:
 *   get:
 *     summary: Lấy chi tiết kết quả test theo ID
 *     tags: [Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resultId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của kết quả bài test
 *     responses:
 *       200:
 *         description: Chi tiết kết quả bài test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetailedTestResultResponse'
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy kết quả bài test hoặc người dùng
 *       500:
 *         description: Lỗi server
 */