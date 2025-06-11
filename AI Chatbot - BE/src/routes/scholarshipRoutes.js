const express = require("express");
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");

/**
 * @swagger
 * /api/scholarships:
 *   get:
 *     summary: Lấy danh sách học bổng
 *     tags: [Scholarship]
 *     responses:
 *       200:
 *         description: Danh sách học bổng
 */
router.get("/", scholarshipController.getScholarships);

/**
 * @swagger
 * /api/scholarships:
 *   post:
 *     summary: Tạo học bổng mới
 *     tags: [Scholarship]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - Amount
 *               - SchoolID
 *             properties:
 *               Name:
 *                 type: string
 *                 maxLength: 100
 *                 example: Hoc bong Toan phan
 *                 description: Tên học bổng
 *               Amount:
 *                 type: number
 *                 example: 20000000
 *                 description: Giá trị học bổng
 *               EligibilityCriteria:
 *                 type: string
 *                 maxLength: 255
 *                 example: Diem trung binh > 8.5
 *                 description: Tiêu chí xét học bổng
 *               SchoolID:
 *                 type: integer
 *                 example: 1
 *                 description: ID trường liên kết học bổng (bắt buộc)
 *               Description:
 *                 type: string
 *                 maxLength: 255
 *                 example: Dành cho học sinh xuất sắc.
 *                 description: Mô tả học bổng
 *     responses:
 *       201:
 *         description: Tạo học bổng thành công
 */
router.post("/", scholarshipController.createScholarship);

/**
 * @swagger
 * /api/scholarships/{id}:
 *   delete:
 *     summary: Xóa học bổng theo ID
 *     tags: [Scholarship]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của học bổng cần xóa
 *     responses:
 *       200:
 *         description: Xóa học bổng thành công
 *       404:
 *         description: Không tìm thấy học bổng với ID đã cho
 */
router.delete("/:id", scholarshipController.deleteScholarship);

module.exports = router;
