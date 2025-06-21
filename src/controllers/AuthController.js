const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const RefreshToken = require('../models/RefreshToken');
const BlacklistToken = require('../models/BlacklistToken');
const OTP = require('../models/OTP');
const crypto = require('crypto');
const { sendOTPEmail } = require('../utils/emailService');
const { cloudinary } = require('../config/cloudinary');

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
      
      if (user.isActive === false) {
        return res.status(403).json({ error: 'Tài khoản đã bị vô hiệu hóa, vui lòng liên hệ quản trị viên' });
      }
      
      const isPasswordValid = await bcrypt.compare(String(password), user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác' });
      }
      
      let student = null;
      if (user.role === 'student') {
        student = await Student.findOne({ userId: user._id });
        
        if (!student) {
          return res.status(404).json({ error: 'Không tìm thấy thông tin sinh viên' });
        }
      }
      
      const tokenPayload = { id: user._id };
      if (user.role === 'student' && student) {
        tokenPayload.studentId = student._id;
      }

      const accessToken = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' } 
      );
      
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret',
        { expiresIn: '7d' } 
      );
      
      await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      });
      
      const userResponse = {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      };
      
      if (user.role === 'student' && student) {
        userResponse.studentId = student._id;
      }
      
      res.json({
        message: 'Đăng nhập thành công',
        accessToken,
        refreshToken,
        user: userResponse
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
      
      const userResponse = user.toObject();
      
      if (user.role === 'student') {
        const student = await Student.findOne({ userId: user._id });
        if (student) {
          userResponse.studentId = student._id;
        }
      }
      
      res.json({ user: userResponse });
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
      
      if (req.file) {
        if (user.profilePicture && user.profilePicture.includes('cloudinary')) {
          try {
            const publicId = user.profilePicture.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy('profile-pictures/' + publicId);
          } catch (error) {
            console.error('Error deleting old profile picture:', error);
          }
        }
        
        user.profilePicture = req.file.path;
      }
      
      await user.save();
      
      res.json({
        message: 'Cập nhật thông tin thành công',
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          address: user.address,
          role: user.role,
          profilePicture: user.profilePicture
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
  },

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token không được cung cấp' });
      }
      
      const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
      
      if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
        return res.status(403).json({ error: 'Refresh token không hợp lệ hoặc đã hết hạn' });
      }
      
      const decoded = jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret'
      );
      
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      const tokenPayload = { id: user._id };
      
      if (user.role === 'student') {
        const student = await Student.findOne({ userId: user._id });
        if (student) {
          tokenPayload.studentId = student._id;
        }
      }

      const accessToken = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );
      
      const userResponse = {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      };
      
      if (user.role === 'student') {
        const student = await Student.findOne({ userId: user._id });
        if (student) {
          userResponse.studentId = student._id;
        }
      }
      
      res.json({
        accessToken,
        user: userResponse
      });
    } catch (error) {
      console.error('Error refreshing token:', error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Refresh token không hợp lệ' });
      }
      res.status(500).json({ error: 'Đã xảy ra lỗi khi làm mới token' });
    }
  },

  async logout(req, res) {
    try {
      const { refreshToken } = req.body;
      const accessToken = req.header('Authorization')?.replace('Bearer ', '');
      

      if (refreshToken) {
        await RefreshToken.findOneAndDelete({ token: refreshToken });
      }

      if (accessToken && accessToken !== 'undefined') {
        try {
          await BlacklistToken.create({
            token: accessToken,
            expiresAt: new Date(Date.now() + 3600 * 1000)
          });
        } catch (error) {
          console.error('Error blacklisting token:', error);
        }
      }
      
      res.json({ message: 'Đăng xuất thành công' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng xuất' });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email không được cung cấp' });
      }
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ error: 'Email không tồn tại trong hệ thống' });
      }
      
   
      const otp = crypto.randomInt(100000, 999999).toString();
      
   
      await OTP.findOneAndDelete({ email }); 
      await OTP.create({
        email,
        otp
      });
      
      // Gửi OTP qua email
      const emailSent = await sendOTPEmail(email, otp);
      
      if (emailSent) {
        res.json({ message: 'Mã OTP đã được gửi đến email của bạn' });
      } else {
        res.status(500).json({ error: 'Không thể gửi email OTP' });
      }
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu' });
    }
  },

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      
      if (!email || !otp) {
        return res.status(400).json({ error: 'Email và OTP không được cung cấp đầy đủ' });
      }
      
      const otpRecord = await OTP.findOne({ email, otp });
      
      if (!otpRecord) {
        return res.status(400).json({ error: 'OTP không hợp lệ hoặc đã hết hạn' });
      }
      
   
      const resetToken = crypto.randomBytes(32).toString('hex');
      
     
      const user = await User.findOne({ email });
      user.resetToken = resetToken;
      user.resetTokenExpires = Date.now() + 15 * 60 * 1000; 
      await user.save();
      
      // Xóa OTP đã sử dụng
      await OTP.findOneAndDelete({ email, otp });
      
      res.json({ message: 'Xác thực OTP thành công', resetToken });
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực OTP' });
    }
  },

  async resetPassword(req, res) {
    try {
      const { email, resetToken, newPassword } = req.body;
      
      if (!email || !resetToken || !newPassword) {
        return res.status(400).json({ error: 'Thông tin không đầy đủ' });
      }
      
      const user = await User.findOne({ 
        email, 
        resetToken, 
        resetTokenExpires: { $gt: Date.now() } 
      });
      
      if (!user) {
        return res.status(400).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
      }
      
  
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();
      
      res.json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đặt lại mật khẩu' });
    }
  },

  async updateProfilePicture(req, res) {
    try {
      const userId = req.user.id;
      
      if (!req.file) {
        return res.status(400).json({ error: 'Không có file hình ảnh nào được tải lên' });
      }
      
      const imageUrl = req.file.path;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      if (user.profilePicture && user.profilePicture.includes('cloudinary')) {
        try {
          const publicId = user.profilePicture.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy('profile-pictures/' + publicId);
        } catch (error) {
          console.error('Error deleting old profile picture:', error);
        }
      }
      
      user.profilePicture = imageUrl;
      await user.save();
      
      res.json({
        message: 'Cập nhật ảnh đại diện thành công',
        profilePicture: imageUrl
      });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật ảnh đại diện' });
    }
  }
};

module.exports = AuthController;
