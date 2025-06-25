const NotificationToken = require('../models/NotificationToken');
const User = require('../models/User');
const { admin } = require('../config/firebase');

console.log('Firebase Admin SDK version:', admin.SDK_VERSION);

const NotificationController = {

  async registerToken(req, res) {
    try {
      const { token, deviceType } = req.body;
      const userId = req.user.id;

      if (!token || !deviceType) {
        return res.status(400).json({ error: 'Token và loại thiết bị là bắt buộc' });
      }

      
      const existingToken = await NotificationToken.findOne({ token });
      
      if (existingToken) {
        
        if (existingToken.userId.toString() !== userId) {
          existingToken.userId = userId;
          await existingToken.save();
        }
        return res.json({ message: 'Token đã được cập nhật' });
      }

     
      const newToken = new NotificationToken({
        userId,
        token,
        deviceType
      });

      await newToken.save();
      res.status(201).json({ message: 'Đăng ký token thành công' });
    } catch (error) {
      console.error('Error registering token:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng ký token' });
    }
  },


  async unregisterToken(req, res) {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ error: 'Token là bắt buộc' });
      }

      await NotificationToken.findOneAndDelete({ 
        token, 
        userId: req.user.id 
      });

      res.json({ message: 'Hủy đăng ký token thành công' });
    } catch (error) {
      console.error('Error unregistering token:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi hủy đăng ký token' });
    }
  },

  async sendNotificationToUser(req, res) {
    try {
      const { userId, title, body, data } = req.body;
      
      if (!userId || !title || !body) {
        return res.status(400).json({ 
          error: 'UserId, tiêu đề và nội dung thông báo là bắt buộc' 
        });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          error: 'Chỉ admin mới có quyền gửi thông báo' 
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      const tokensDoc = await NotificationToken.find({ userId });
      
      if (tokensDoc.length === 0) {
        return res.json({ 
          message: 'Người dùng không có thiết bị nào đăng ký nhận thông báo',
          success: 0,
          failure: 0,
          totalTokens: 0
        });
      }

      const deviceTokens = tokensDoc.map(t => t.token);
      const idMap = tokensDoc.map(t => t._id);
      
      let successCount = 0;
      let failureCount = 0;
      let invalidTokens = [];
      
      // Chia nhỏ mảng token thành các nhóm tối đa 500
      const batchSize = 500;
      for (let i = 0; i < deviceTokens.length; i += batchSize) {
        const batchTokens = deviceTokens.slice(i, i + batchSize);
        const batchIds = idMap.slice(i, i + batchSize);
        
        // Sử dụng Promise.all để gửi thông báo đến từng token
        const sendPromises = batchTokens.map((token, idx) => {
          const message = {
            notification: { title, body },
            data: data || {},
            token: token
          };
          
          return admin.messaging().send(message)
            .then(() => {
              successCount++;
              return { success: true };
            })
            .catch(error => {
              failureCount++;
              if (error.code === 'messaging/registration-token-not-registered') {
                invalidTokens.push(batchIds[idx]);
              }
              console.error('Error sending to token:', error.message);
              return { success: false, error };
            });
        });
        
        await Promise.all(sendPromises);
      }
      
      if (invalidTokens.length > 0) {
        await NotificationToken.deleteMany({ _id: { $in: invalidTokens } });
        console.log(`Đã xóa ${invalidTokens.length} token không hợp lệ`);
      }
      
      res.json({ 
        message: 'Thông báo đã được gửi', 
        success: successCount,
        failure: failureCount,
        totalTokens: deviceTokens.length,
        invalidTokensRemoved: invalidTokens.length
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi thông báo' });
    }
  },

  async sendNotificationToMany(req, res) {
    try {
      const { userIds, title, body, data } = req.body;
      
      if (!userIds || !Array.isArray(userIds) || !title || !body) {
        return res.status(400).json({ 
          error: 'Danh sách userIds, tiêu đề và nội dung thông báo là bắt buộc' 
        });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          error: 'Chỉ admin mới có quyền gửi thông báo' 
        });
      }

      const tokensDoc = await NotificationToken.find({ 
        userId: { $in: userIds } 
      });
      
      if (tokensDoc.length === 0) {
        return res.status(404).json({ 
          error: 'Không có thiết bị nào đăng ký nhận thông báo' 
        });
      }

      const deviceTokens = tokensDoc.map(t => t.token);
      const idMap = tokensDoc.map(t => t._id);
      
      let successCount = 0;
      let failureCount = 0;
      let invalidTokens = [];
      
      // Chia nhỏ mảng token thành các nhóm tối đa 500
      const batchSize = 500;
      for (let i = 0; i < deviceTokens.length; i += batchSize) {
        const batchTokens = deviceTokens.slice(i, i + batchSize);
        const batchIds = idMap.slice(i, i + batchSize);
        
        // Sử dụng Promise.all để gửi thông báo đến từng token
        const sendPromises = batchTokens.map((token, idx) => {
          const message = {
            notification: { title, body },
            data: data || {},
            token: token
          };
          
          return admin.messaging().send(message)
            .then(() => {
              successCount++;
              return { success: true };
            })
            .catch(error => {
              failureCount++;
              if (error.code === 'messaging/registration-token-not-registered') {
                invalidTokens.push(batchIds[idx]);
              }
              console.error('Error sending to token:', error.message);
              return { success: false, error };
            });
        });
        
        await Promise.all(sendPromises);
      }
      
      if (invalidTokens.length > 0) {
        await NotificationToken.deleteMany({ _id: { $in: invalidTokens } });
        console.log(`Đã xóa ${invalidTokens.length} token không hợp lệ`);
      }
      
      res.json({ 
        message: 'Thông báo đã được gửi', 
        success: successCount,
        failure: failureCount,
        totalTokens: deviceTokens.length,
        invalidTokensRemoved: invalidTokens.length
      });
    } catch (error) {
      console.error('Error sending notification to many:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi thông báo' });
    }
  },

  async sendNotificationToAll(req, res) {
    try {
      const { title, body, data } = req.body;
      
      if (!title || !body) {
        return res.status(400).json({ 
          error: 'Tiêu đề và nội dung thông báo là bắt buộc' 
        });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          error: 'Chỉ admin mới có quyền gửi thông báo' 
        });
      }

      const tokensDoc = await NotificationToken.find();
      
      if (tokensDoc.length === 0) {
        return res.json({ 
          message: 'Không có thiết bị nào đăng ký nhận thông báo',
          success: 0,
          failure: 0,
          totalTokens: 0
        });
      }

      const deviceTokens = tokensDoc.map(t => t.token);
      const idMap = tokensDoc.map(t => t._id);

      let successCount = 0;
      let failureCount = 0;
      let invalidTokens = [];

      // Chia nhỏ mảng token thành các nhóm tối đa 500
      const batchSize = 500;
      for (let i = 0; i < deviceTokens.length; i += batchSize) {
        const batchTokens = deviceTokens.slice(i, i + batchSize);
        const batchIds = idMap.slice(i, i + batchSize);

        // Sử dụng Promise.all để gửi thông báo đến từng token
        const sendPromises = batchTokens.map((token, idx) => {
          const message = {
            notification: { title, body },
            data: data || {},
            token: token
          };

          return admin.messaging().send(message)
            .then(() => {
              successCount++;
              return { success: true };
            })
            .catch(error => {
              failureCount++;
              if (error.code === 'messaging/registration-token-not-registered') {
                invalidTokens.push(batchIds[idx]);
              }
              console.error('Error sending to token:', error.message);
              return { success: false, error };
            });
        });

        await Promise.all(sendPromises);
      }

      if (invalidTokens.length > 0) {
        await NotificationToken.deleteMany({ _id: { $in: invalidTokens } });
        console.log(`Đã xóa ${invalidTokens.length} token không hợp lệ`);
      }

      res.json({ 
        message: 'Thông báo đã được gửi', 
        success: successCount,
        failure: failureCount,
        totalTokens: deviceTokens.length,
        invalidTokensRemoved: invalidTokens.length
      });
    } catch (error) {
      console.error('Error sending notification to all:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi thông báo' });
    }
  }
};

module.exports = NotificationController;