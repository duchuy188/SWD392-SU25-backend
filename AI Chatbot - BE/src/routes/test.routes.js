const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Test successful!
 */
router.get('/test', (req, res) => {
  res.json({ message: 'Test successful!' });
});

module.exports = router;