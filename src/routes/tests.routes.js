const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');
const { authMiddleware } = require('../middlewares/auth.middleware');


const studentMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ error: 'Chỉ học sinh mới được phép làm bài test' });
  }
};


router.get('/', TestController.getTests);

router.use(authMiddleware);


router.get('/my-results', TestController.getMyTestResults);


router.get('/:id', TestController.getTestById);
router.post('/:id/submit', studentMiddleware, TestController.submitTest);

router.get('/results/:resultId', TestController.getTestResultById);

module.exports = router;