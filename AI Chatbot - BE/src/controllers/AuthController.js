const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {

  async register(req, res) {
    try {
      const { email, password, fullName, phone, address } = req.body;
      
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({ 
          error: 'Email này đã được sử dụng' 
        });
      }
      
      const user = new User({
        email,
        password,
        fullName,
        phone,
        address,
        role: 'student'
      });
      
      await user.save();
      
      const student = new Student({
        userId: user._id,
      });
      
      await student.save();
      
      res.status(201).json({
        message: 'Đăng ký thành công',
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          studentId: student._id
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng ký' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Email và mật khẩu không hợp lệ' });
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ error: 'Email không tồn tại' });
      }
      
   
      
      const isPasswordValid = await bcrypt.compare(String(password), user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác' });
      }
      
      const student = await Student.findOne({ userId: user._id });
      
      if (!student && user.role === 'student') {
        return res.status(404).json({ error: 'Không tìm thấy thông tin sinh viên' });
      }
      
      const token = jwt.sign(
        { id: user._id, studentId: student?._id },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );
      
      res.json({
        message: 'Đăng nhập thành công',
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          studentId: student?._id
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập' });
    }
  },

  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      const student = await Student.findOne({ userId: user._id });
      
      res.json({
        user: {
          ...user.toObject(),
          studentId: student?._id
        }
      });
    } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.user.id;
      const { fullName, phone, address } = req.body;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      if (fullName) user.fullName = fullName;
      if (phone !== undefined) user.phone = phone;
      if (address !== undefined) user.address = address;
      
      await user.save();
      
      res.json({
        message: 'Cập nhật thông tin thành công',
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          address: user.address,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin' });
    }
  },

  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác' });
      }
      
      user.password = newPassword;
      await user.save();
      
      res.json({ message: 'Thay đổi mật khẩu thành công' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu' });
    }
  }
};

module.exports = AuthController;