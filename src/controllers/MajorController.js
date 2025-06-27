const Major = require('../models/Major');
const { cloudinary } = require('../config/cloudinary');

const MajorController = {

  
  
  async getAllMajors(req, res) {
    try {
      const { 
        page = 1, 
        limit = 9, 
        search = '', 
        department = '',
        subjects = [],
        campus = '',
        includeFilters = false,
        quickSearch = false
      } = req.query;
      
      if (quickSearch === 'true' || quickSearch === true) {
        if (!search.trim()) {
          return res.status(400).json({ error: 'Vui lòng nhập từ khóa tìm kiếm' });
        }
        
        const majors = await Major.find({
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
            { department: { $regex: search, $options: 'i' } },
            { code: { $regex: search, $options: 'i' } }
          ]
        })
        .limit(parseInt(limit));
        
        const formattedResults = majors.map(major => ({
          id: major._id,
          name: major.name,
          department: major.department,
          description: major.shortDescription || major.description?.substring(0, 150) + '...',
          imageUrl: major.imageUrl || `/images/majors/${major.code.toLowerCase()}.jpg`,
          code: major.code
        }));
        
        return res.json(formattedResults);
      }
      
      const filter = {};
   
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } }
        ];
      }
      
      
      if (department) {
        filter.department = department;
      }
      
     
      if (subjects && subjects.length > 0) {
        const subjectArray = Array.isArray(subjects) ? subjects : [subjects];
        filter.requiredSkills = { $in: subjectArray };
      }
      
    
      if (campus) {
        filter.availableAt = campus;
      }
      
     
      const total = await Major.countDocuments(filter);
      
    
      const majors = await Major.find(filter)
        .sort({ name: 1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
      
      
      const formattedMajors = majors.map(major => ({
        id: major._id,
        name: major.name,
        description: major.shortDescription || major.description?.substring(0, 150) + '...',
        imageUrl: major.imageUrl || `/images/majors/${major.code.toLowerCase()}.jpg`,
        relatedSubjects: major.requiredSkills?.slice(0, 3) || [],
        department: major.department,
        universityCount: major.availableAt?.length || 0,
        isNewProgram: major.isNewProgram || false
      }));
      
      const response = {
        majors: formattedMajors,
        totalPages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page),
        totalItems: total
      };
      
      if (includeFilters === 'true' || includeFilters === true) {
        const departments = await Major.distinct('department');
        
        const allMajors = await Major.find().select('requiredSkills');
        const allSkills = allMajors.flatMap(major => major.requiredSkills || []);
        const subjects = [...new Set(allSkills)];
        
        const campuses = ['HANOI', 'HCMC', 'DANANG', 'CANTHO', 'QNHON'];
        
        response.filters = {
          departments,
          subjects,
          campuses
        };
      }
      
      res.json(response);
    } catch (error) {
      console.error('Error getting majors:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ngành học' });
    }
  },
  
 
  async getMajorById(req, res) {
    try {
      const major = await Major.findById(req.params.id);
      
      if (!major) {
        return res.status(404).json({ error: 'Không tìm thấy ngành học' });
      }
      
      res.json(major);
    } catch (error) {
      console.error('Error getting major details:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin ngành học' });
    }
  },
  
 
  

  async getAllMajorsAdmin(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search = '', 
        department = '',
        sortBy = 'name',
        sortOrder = 'asc'
      } = req.query;
      
      const filter = {};
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (department) {
        filter.department = department;
      }
      
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
      
      const total = await Major.countDocuments(filter);
      
      const majors = await Major.find(filter)
        .sort(sort)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
      
      res.json({
        majors,
        totalPages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page),
        totalItems: total
      });
    } catch (error) {
      console.error('Error getting all majors for admin:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ngành học' });
    }
  },
  
 
  async createMajor(req, res) {
    try {
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      
      let {
        name,
        department,
        description,
        shortDescription,
        code,
        totalCredits,
        tuition,
        tuitionByCampus,
        requiredSkills,
        advantages,
        availableAt,
        admissionCriteria,
        programStructure,
        careerProspects,
        subjectCombinations,
        isNewProgram,
        scholarships
      } = req.body;
      
      // Kiểm tra các trường bắt buộc
      if (!name || !department || !code) {
        return res.status(400).json({ error: 'Các trường bắt buộc: name, department, code' });
      }
      
      // Kiểm tra mã ngành đã tồn tại chưa
      const existingMajor = await Major.findOne({ code });
      if (existingMajor) {
        return res.status(400).json({ error: 'Mã ngành đã tồn tại' });
      }
      
      // Log raw data để debug
      console.log("Raw careerProspects:", careerProspects);
      console.log("Raw scholarships:", scholarships);
      
      // Xử lý careerProspects nếu là chuỗi JSON
      if (typeof careerProspects === 'string') {
        try {
          // Xử lý trường hợp chuỗi không bắt đầu bằng [ nhưng là JSON hợp lệ
          if (!careerProspects.trim().startsWith('[')) {
            careerProspects = `[${careerProspects}]`;
          }
          careerProspects = JSON.parse(careerProspects);
          console.log("Parsed careerProspects:", careerProspects);
        } catch (e) {
          console.error("Error parsing careerProspects:", e);
          careerProspects = [];
        }
      }
      
      // Xử lý scholarships nếu là chuỗi JSON
      if (typeof scholarships === 'string') {
        try {
          // Xử lý trường hợp chuỗi không bắt đầu bằng [ nhưng là JSON hợp lệ
          if (!scholarships.trim().startsWith('[')) {
            scholarships = `[${scholarships}]`;
          }
          scholarships = JSON.parse(scholarships);
          console.log("Parsed scholarships:", scholarships);
        } catch (e) {
          console.error("Error parsing scholarships:", e);
          scholarships = [];
        }
      }
      
      // Xử lý availableAt nếu là chuỗi
      if (typeof availableAt === 'string') {
        availableAt = availableAt.split(',');
      }
      
      // Xử lý programStructure nếu là chuỗi JSON
      if (typeof programStructure === 'string') {
        try {
          programStructure = JSON.parse(programStructure);
        } catch (e) {
          programStructure = {};
        }
      }
      
      // Xử lý requiredSkills nếu là chuỗi JSON
      if (typeof requiredSkills === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!requiredSkills.trim()) {
            requiredSkills = [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (requiredSkills.trim().startsWith('[')) {
            requiredSkills = JSON.parse(requiredSkills);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            requiredSkills = requiredSkills.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (requiredSkills.length === 0 && requiredSkills.trim()) {
              requiredSkills = [requiredSkills.trim()];
            }
          }
          console.log("Processed requiredSkills:", requiredSkills);
        } catch (e) {
          console.error("Error parsing requiredSkills:", e);
          requiredSkills = [];
        }
      }
      
      // Xử lý advantages nếu là chuỗi JSON
      if (typeof advantages === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!advantages.trim()) {
            advantages = [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (advantages.trim().startsWith('[')) {
            advantages = JSON.parse(advantages);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            advantages = advantages.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (advantages.length === 0 && advantages.trim()) {
              advantages = [advantages.trim()];
            }
          }
          console.log("Processed advantages:", advantages);
        } catch (e) {
          console.error("Error parsing advantages:", e);
          advantages = [];
        }
      }
      
      // Xử lý subjectCombinations nếu là chuỗi JSON
      if (typeof subjectCombinations === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!subjectCombinations.trim()) {
            subjectCombinations = [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (subjectCombinations.trim().startsWith('[')) {
            subjectCombinations = JSON.parse(subjectCombinations);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            subjectCombinations = subjectCombinations.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (subjectCombinations.length === 0 && subjectCombinations.trim()) {
              subjectCombinations = [subjectCombinations.trim()];
            }
          }
          console.log("Processed subjectCombinations:", subjectCombinations);
        } catch (e) {
          console.error("Error parsing subjectCombinations:", e);
          subjectCombinations = [];
        }
      }
      
      // Xử lý tuition nếu là chuỗi JSON
      if (typeof tuition === 'string') {
        try {
          tuition = JSON.parse(tuition);
        } catch (e) {
          tuition = { firstSem: 0, midSem: 0, lastSem: 0 };
        }
      }
      
      // Xử lý tuitionByCampus nếu là chuỗi JSON
      if (typeof tuitionByCampus === 'string') {
        try {
          tuitionByCampus = JSON.parse(tuitionByCampus);
        } catch (e) {
          tuitionByCampus = {};
        }
      }
      
      // Lấy URL hình ảnh nếu có upload file
      const imageUrl = req.file ? req.file.path : null;
      console.log("Image URL:", imageUrl);
      
      
      if (programStructure) {
        if (!programStructure.graduation) {
          programStructure.graduation = {
            duration: "Học kỳ cuối",
            objectives: [],
            options: []
          };
        } else {
          
          if (!programStructure.graduation.duration) {
            programStructure.graduation.duration = "Học kỳ cuối";
          }
          if (!programStructure.graduation.objectives) {
            programStructure.graduation.objectives = [];
          }
          if (!programStructure.graduation.options) {
            programStructure.graduation.options = [];
          }
        }
      }
      
      const newMajor = new Major({
        name,
        department,
        description,
        shortDescription: shortDescription || description?.substring(0, 200),
        code,
        totalCredits: Number(totalCredits),
        tuition,
        tuitionByCampus,
        requiredSkills: requiredSkills || [],
        advantages: advantages || [],
        availableAt: availableAt || [],
        admissionCriteria,
        programStructure,
        careerProspects: careerProspects || [],
        subjectCombinations: subjectCombinations || [],
        isNewProgram: isNewProgram === 'true' || isNewProgram === true,
        scholarships: scholarships || [],
        imageUrl
      });
      
      console.log("New major object:", JSON.stringify(newMajor, null, 2));
      
      const savedMajor = await newMajor.save();
      res.status(201).json(savedMajor);
    } catch (error) {
      console.error('Error creating major:', error);
      console.error('Error stack:', error.stack);
      
      // Improved error handling
      let errorMessage = 'Đã xảy ra lỗi khi tạo ngành học';
      let details = '';
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        errorMessage = `Lỗi xác thực: ${validationErrors.join(', ')}`;
        details = JSON.stringify(error.errors);
      } 
      // Handle duplicate key errors
      else if (error.code === 11000) {
        errorMessage = 'Mã ngành học đã tồn tại';
        details = JSON.stringify(error.keyValue);
      }
      // Handle other errors
      else {
        details = error.message || 'Unknown error';
      }
      
      res.status(500).json({ 
        error: errorMessage,
        details: details
      });
    }
  },
  
  
  async updateMajor(req, res) {
    try {
      let {
        name,
        department,
        description,
        shortDescription,
        code,
        totalCredits,
        tuition,
        tuitionByCampus,
        requiredSkills,
        advantages,
        availableAt,
        admissionCriteria,
        programStructure,
        careerProspects,
        subjectCombinations,
        isNewProgram,
        scholarships
      } = req.body;
      
      // Tìm ngành học cần cập nhật
      const major = await Major.findById(req.params.id);
      if (!major) {
        return res.status(404).json({ error: 'Không tìm thấy ngành học' });
      }
      
      
      if (typeof careerProspects === 'string') {
        try {
          careerProspects = JSON.parse(careerProspects);
        } catch (e) {
          careerProspects = major.careerProspects || [];
        }
      }
      
      
      if (typeof scholarships === 'string') {
        try {
          scholarships = JSON.parse(scholarships);
        } catch (e) {
          scholarships = major.scholarships || [];
        }
      }
      
      
      if (typeof availableAt === 'string') {
        availableAt = availableAt.split(',');
      }
      
     
      if (typeof programStructure === 'string') {
        try {
          programStructure = JSON.parse(programStructure);
        } catch (e) {
          programStructure = major.programStructure || {};
        }
      }
      
     
      if (typeof requiredSkills === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!requiredSkills.trim()) {
            requiredSkills = major.requiredSkills || [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (requiredSkills.trim().startsWith('[')) {
            requiredSkills = JSON.parse(requiredSkills);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            requiredSkills = requiredSkills.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (requiredSkills.length === 0 && requiredSkills.trim()) {
              requiredSkills = [requiredSkills.trim()];
            }
          }
          console.log("Processed requiredSkills:", requiredSkills);
        } catch (e) {
          console.error("Error parsing requiredSkills:", e);
          requiredSkills = major.requiredSkills || [];
        }
      }
      
      
      if (typeof advantages === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!advantages.trim()) {
            advantages = [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (advantages.trim().startsWith('[')) {
            advantages = JSON.parse(advantages);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            advantages = advantages.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (advantages.length === 0 && advantages.trim()) {
              advantages = [advantages.trim()];
            }
          }
          console.log("Processed advantages:", advantages);
        } catch (e) {
          console.error("Error parsing advantages:", e);
          advantages = [];
        }
      }
      
      // Xử lý subjectCombinations nếu là chuỗi JSON
      if (typeof subjectCombinations === 'string') {
        try {
          // Nếu là chuỗi rỗng
          if (!subjectCombinations.trim()) {
            subjectCombinations = major.subjectCombinations || [];
          }
          // Nếu là chuỗi JSON hợp lệ
          else if (subjectCombinations.trim().startsWith('[')) {
            subjectCombinations = JSON.parse(subjectCombinations);
          } 
          // Nếu là một giá trị đơn
          else {
            // Thử xử lý như danh sách phân tách bằng dấu phẩy
            subjectCombinations = subjectCombinations.split(',').map(item => item.trim()).filter(Boolean);
            // Nếu chỉ có một phần tử và không có dấu phẩy
            if (subjectCombinations.length === 0 && subjectCombinations.trim()) {
              subjectCombinations = [subjectCombinations.trim()];
            }
          }
          console.log("Processed subjectCombinations:", subjectCombinations);
        } catch (e) {
          console.error("Error parsing subjectCombinations:", e);
          subjectCombinations = major.subjectCombinations || [];
        }
      }
      
      // Xử lý tuition nếu là chuỗi JSON
      if (typeof tuition === 'string') {
        try {
          tuition = JSON.parse(tuition);
        } catch (e) {
          tuition = major.tuition || { firstSem: 0, midSem: 0, lastSem: 0 };
        }
      }
      
      // Xử lý tuitionByCampus nếu là chuỗi JSON
      if (typeof tuitionByCampus === 'string') {
        try {
          tuitionByCampus = JSON.parse(tuitionByCampus);
        } catch (e) {
          tuitionByCampus = major.tuitionByCampus || {};
        }
      }
      
      // Lấy URL hình ảnh nếu có upload file
      const imageUrl = req.file ? req.file.path : major.imageUrl;
      
      // Đảm bảo graduation có đủ các trường
      if (programStructure) {
        if (!programStructure.graduation) {
          programStructure.graduation = {
            duration: "Học kỳ cuối",
            objectives: [],
            options: []
          };
        } else {
          // Nếu graduation đã tồn tại nhưng thiếu trường
          if (!programStructure.graduation.duration) {
            programStructure.graduation.duration = "Học kỳ cuối";
          }
          if (!programStructure.graduation.objectives) {
            programStructure.graduation.objectives = [];
          }
          if (!programStructure.graduation.options) {
            programStructure.graduation.options = [];
          }
        }
      }
      
      const updatedMajor = await Major.findByIdAndUpdate(
        req.params.id,
        {
          name,
          department,
          description,
          shortDescription,
          code,
          totalCredits: Number(totalCredits),
          tuition,
          tuitionByCampus,
          requiredSkills,
          advantages,
          availableAt,
          admissionCriteria,
          programStructure,
          careerProspects,
          subjectCombinations,
          isNewProgram: isNewProgram === 'true' || isNewProgram === true,
          scholarships,
          imageUrl
        },
        { new: true, runValidators: true }
      );
      
      res.json(updatedMajor);
    } catch (error) {
      console.error('Error updating major:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật ngành học: ' + error.message });
    }
  },
  
  
  async deleteMajor(req, res) {
    try {
      const deletedMajor = await Major.findByIdAndDelete(req.params.id);
      
      if (!deletedMajor) {
        return res.status(404).json({ error: 'Không tìm thấy ngành học' });
      }
      
      
      if (deletedMajor.imageUrl && deletedMajor.imageUrl.includes('cloudinary')) {
        try {
         
          const publicId = deletedMajor.imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`major-images/${publicId}`);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
        }
      }
      
      res.json({ message: 'Xóa ngành học thành công' });
    } catch (error) {
      console.error('Error deleting major:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ngành học' });
    }
  },
  
  
  async getFilters(req, res) {
    try {
      const departments = await Major.distinct('department');
      const majors = await Major.find().select('requiredSkills');
      const allSkills = majors.flatMap(major => major.requiredSkills || []);
      const subjects = [...new Set(allSkills)];
      
     
      const campuses = ['HANOI', 'HCMC', 'DANANG', 'CANTHO', 'QNHON'];
      
      res.json({
        departments,
        subjects,
        campuses
      });
    } catch (error) {
      console.error('Error getting filters:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin bộ lọc' });
    }
  }
};

module.exports = MajorController;
