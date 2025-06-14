const { admin } = require('../config/firebase');
const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

const GoogleAuthController = {
  async googleLogin(req, res) {
    try {
      const { idToken } = req.body;
      
      if (!idToken) {
        return res.status(400).json({ error: 'ID token không được cung cấp' });
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { email, name, picture, uid } = decodedToken;
  
      let user = await User.findOne({ email });
      
 
      if (!user) {
        user = new User({
          email,
          fullName: name || email.split('@')[0],
          role: 'student',
          googleId: uid,
          profilePicture: picture
        });
        
        await user.save();
        

        const student = new Student({
          userId: user._id,
        });
        
        await student.save();
      } else {
  
        if (!user.googleId) {
          user.googleId = uid;
          if (picture) user.profilePicture = picture;
          await user.save();
        }
      }

      const student = await Student.findOne({ userId: user._id });
      
  
      const accessToken = jwt.sign(
        { id: user._id, studentId: student?._id },
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
      
      res.json({
        message: 'Đăng nhập Google thành công',
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          studentId: student?._id,
          profilePicture: user.profilePicture
        }
      });
    } catch (error) {
      console.error('Error with Google login:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập với Google' });
    }
  }
};

module.exports = GoogleAuthController;