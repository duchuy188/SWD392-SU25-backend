const User = require('../models/User');
const Student = require('../models/Student');

const AdminController = {
  async getUserList(req, res) {
    try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
   
      const searchQuery = {};
      const { search, role, isActive } = req.query;
      
      if (search) {
        searchQuery.$or = [
          { email: { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ];
      }
      

      if (role) {
        searchQuery.role = role;
      }
      
      if (isActive !== undefined) {
        searchQuery.isActive = isActive === 'true';
      }
      
    
      const sortField = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      const sortOptions = {};
      sortOptions[sortField] = sortOrder;
      

      const users = await User.find(searchQuery)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);
      
      const total = await User.countDocuments(searchQuery);
      
      res.json({
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        },
        filters: {
          search,
          role,
          isActive: isActive !== undefined ? isActive === 'true' : undefined
        },
        sorting: {
          sortBy: sortField,
          sortOrder: sortOrder === 1 ? 'asc' : 'desc'
        }
      });
    } catch (error) {
      console.error('Error getting user list:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng' });
    }
  },


  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      

      let studentInfo = null;
      if (user.role === 'student') {
        studentInfo = await Student.findOne({ userId: user._id });
      }
      
      res.json({
        user,
        studentInfo
      });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng' });
    }
  },
  

  async updateUserStatus(req, res) {
    try {
      const { isActive } = req.body;
      const userId = req.params.id;
      
      if (isActive === undefined) {
        return res.status(400).json({ error: 'Thiếu thông tin trạng thái tài khoản' });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
  
      if (userId === req.user.id && isActive === false) {
        return res.status(400).json({ error: 'Không thể vô hiệu hóa tài khoản của chính mình' });
      }
      
      user.isActive = isActive;
      await user.save();
      
      res.json({
        message: isActive ? 'Kích hoạt tài khoản thành công' : 'Vô hiệu hóa tài khoản thành công',
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isActive: user.isActive
        }
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật trạng thái tài khoản' });
    }
  },

  async updateUser(req, res) {
    try {
      const { fullName, phone, address, role } = req.body;
      const userId = req.params.id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
      if (fullName) user.fullName = fullName;
      if (phone !== undefined) user.phone = phone;
      if (address !== undefined) user.address = address;
      
      if (role && role !== user.role) {
        const oldRole = user.role;
        user.role = role;
        
        if (oldRole === 'student' && role === 'admin') {
          await Student.findOneAndDelete({ userId: user._id });
        }
        
        if (oldRole === 'admin' && role === 'student') {
          const existingStudent = await Student.findOne({ userId: user._id });
          if (!existingStudent) {
            const student = new Student({
              userId: user._id
            });
            await student.save();
          }
        }
      }
      
      await user.save();
      
      res.json({
        message: 'Cập nhật thông tin người dùng thành công',
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
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
  },

  async createUser(req, res) {
    try {
      const { email, fullName, password, phone, address, role } = req.body;
      

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email đã được sử dụng' });
      }
      

      const user = new User({
        email,
        fullName,
        password, 
        phone,
        address,
        role: role || 'student',
        isActive: true
      });
      
      await user.save();
      
    
      if (user.role === 'student') {
        const student = new Student({
          userId: user._id
        });
        await student.save();
      }
      
      res.status(201).json({
        message: 'Tạo người dùng thành công',
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo người dùng' });
    }
  }
};

module.exports = AdminController;