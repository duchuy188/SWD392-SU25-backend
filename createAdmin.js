// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function createAdmin() {
  try {
    // Import User model sau khi đã kết nối MongoDB
    const User = require('./src/models/User');
    const Student = require('./src/models/Student');

    // Kiểm tra email đã tồn tại chưa
    let user = await User.findOne({ email: 'admin@fpt.edu.vn' });
    
    // Tạo mật khẩu hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    if (user) {
      console.log('Cập nhật mật khẩu cho admin hiện có');
      // Cập nhật mật khẩu
      user.password = hashedPassword;
      await user.save();
    } else {
      console.log('Tạo tài khoản admin mới');
      // Tạo admin mới
      user = new User({
        email: 'admin@fpt.edu.vn',
        password: hashedPassword, // Đã hash
        fullName: 'Admin System',
        phone: '0123456789',
        address: 'FPT University',
        role: 'admin',
        isActive: true
      });
      
      await user.save();
    }
    
    // Kiểm tra trực tiếp với bcrypt
    const checkPassword = await bcrypt.compare('Admin@123', user.password);
    console.log('Kiểm tra mật khẩu với bcrypt trực tiếp:', checkPassword);
    
    console.log('Admin đã được tạo/cập nhật thành công:', user.email);
    console.log('Mật khẩu (đã hash):', user.password);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Lỗi:', error);
    mongoose.connection.close();
  }
}

createAdmin();