const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Lấy danh sách trường học
 *     tags: [School]
 *     responses:
 *       200:
 *         description: Danh sách trường học
 */
router.get("/", schoolController.getSchools);

module.exports = router;
