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

module.exports = router;
