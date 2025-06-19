const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlacklistToken = require('../models/BlacklistToken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Yêu cầu xác thực' });
    }
    
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ error: 'Token đã bị vô hiệu hóa, vui lòng đăng nhập lại' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    const user = await User.findById(decoded.id).maxTimeMS(5000);
    if (!user) {
      return res.status(401).json({ error: 'Không tìm thấy người dùng' });
    }
    
    if (user.isActive === false) {
      return res.status(403).json({ error: 'Tài khoản đã bị vô hiệu hóa, vui lòng liên hệ quản trị viên' });
    }
    
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      studentId: decoded.studentId
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.code === 'ECONNRESET') {
      return res.status(503).json({ error: 'Lỗi kết nối, vui lòng thử lại sau' });
    }
    
    res.status(401).json({ error: 'Vui lòng đăng nhập lại' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Bạn không có quyền thực hiện hành động này' });
  }
};

module.exports = { authMiddleware, adminMiddleware };