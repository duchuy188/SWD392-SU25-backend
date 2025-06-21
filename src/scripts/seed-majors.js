const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Major = require('../models/Major');
require('dotenv').config();

async function seedMajors() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    

    const contentPath = path.join(__dirname, '../data/fpt_content.txt');
    const content = fs.readFileSync(contentPath, 'utf8');
    
 
    const majors = [
      {
        name: "Kỹ thuật phần mềm",
        department: "Công nghệ thông tin",
        code: "SE",
        description: "Ngành Kỹ thuật phần mềm đào tạo các kỹ sư phát triển phần mềm chuyên nghiệp, có khả năng thiết kế, xây dựng, kiểm thử và bảo trì các hệ thống phần mềm quy mô lớn.",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ với điểm trung bình từ 6.0 trở lên",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Lập trình", "Phân tích thiết kế", "Làm việc nhóm", "Giải quyết vấn đề", "Tư duy logic"],
        advantages: ["Cơ hội việc làm cao", "Lương khởi điểm tốt", "Nhiều cơ hội làm việc quốc tế"],
        availableAt: ["HANOI", "HCMC", "DANANG", "CANTHO", "QNHON"],
        programStructure: {
          preparation: {
            duration: "1 năm đầu",
            objectives: ["Nền tảng tiếng Anh", "Kỹ năng mềm", "Tư duy lập trình"],
            courses: ["Nhập môn lập trình", "Tiếng Anh chuyên ngành", "Toán cho CNTT"]
          },
          basic: {
            duration: "1.5 năm tiếp theo",
            objectives: ["Kiến thức nền tảng CNTT", "Kỹ năng lập trình", "Phát triển phần mềm"],
            courses: ["Cấu trúc dữ liệu và giải thuật", "Lập trình hướng đối tượng", "Cơ sở dữ liệu", "Phát triển ứng dụng web"]
          },
          ojt: {
            duration: "4 tháng",
            objectives: ["Thực tập tại doanh nghiệp", "Áp dụng kiến thức vào thực tế"]
          },
          specialization: {
            duration: "1 năm cuối",
            objectives: ["Chuyên sâu về kỹ thuật phần mềm", "Phát triển dự án thực tế"],
            courses: ["Kiểm thử phần mềm", "DevOps", "Phát triển phần mềm Agile", "Kiến trúc phần mềm"]
          }
        },
        careerProspects: [
          {
            title: "Kỹ sư phát triển phần mềm",
            description: "Phát triển ứng dụng web, mobile và desktop cho doanh nghiệp"
          },
          {
            title: "Kỹ sư kiểm thử phần mềm",
            description: "Đảm bảo chất lượng phần mềm thông qua kiểm thử tự động và thủ công"
          },
          {
            title: "Quản lý dự án phần mềm",
            description: "Điều phối và quản lý các dự án phát triển phần mềm"
          }
        ],
        subjectCombinations: ["A00", "A01", "D01", "D07"]
      },
      {
        name: "Hệ thống thông tin",
        department: "Công nghệ thông tin",
        code: "IS",
        description: "Ngành Hệ thống thông tin đào tạo các chuyên gia về quản trị và phát triển hệ thống CNTT",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Phân tích dữ liệu", "Quản trị hệ thống", "Lập trình"],
        advantages: ["Nhu cầu cao từ doanh nghiệp", "Phát triển đa dạng"],
        availableAt: ["HANOI", "HCMC", "DANANG"]
      },
      {
        name: "Trí tuệ nhân tạo",
        department: "Công nghệ thông tin",
        code: "AI",
        description: "Ngành Trí tuệ nhân tạo đào tạo chuyên gia về AI, Machine Learning và Data Science, có khả năng xây dựng các hệ thống thông minh và phân tích dữ liệu lớn.",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ với điểm trung bình từ 7.0 trở lên",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Toán học", "Lập trình", "Phân tích dữ liệu", "Tư duy thuật toán", "Nghiên cứu"],
        advantages: ["Ngành hot", "Lương cao", "Cơ hội nghiên cứu", "Triển vọng phát triển"],
        availableAt: ["HANOI", "HCMC"],
        programStructure: {
          preparation: {
            duration: "1 năm đầu",
            objectives: ["Nền tảng tiếng Anh", "Toán cao cấp", "Tư duy lập trình"],
            courses: ["Nhập môn lập trình", "Tiếng Anh chuyên ngành", "Đại số tuyến tính", "Giải tích"]
          },
          basic: {
            duration: "1.5 năm tiếp theo",
            objectives: ["Kiến thức nền tảng CNTT", "Toán cho AI", "Cơ sở AI"],
            courses: ["Cấu trúc dữ liệu và giải thuật", "Xác suất thống kê", "Học máy cơ bản", "Khai phá dữ liệu"]
          },
          ojt: {
            duration: "4 tháng",
            objectives: ["Thực tập tại doanh nghiệp AI", "Tham gia dự án thực tế"]
          },
          specialization: {
            duration: "1 năm cuối",
            objectives: ["Chuyên sâu về AI và ML", "Nghiên cứu và phát triển"],
            courses: ["Học sâu", "Xử lý ngôn ngữ tự nhiên", "Thị giác máy tính", "Robotics"]
          }
        },
        careerProspects: [
          {
            title: "Kỹ sư AI",
            description: "Phát triển các hệ thống và ứng dụng AI cho doanh nghiệp"
          },
          {
            title: "Chuyên gia Data Science",
            description: "Phân tích và khai thác giá trị từ dữ liệu lớn"
          },
          {
            title: "Nghiên cứu viên AI",
            description: "Nghiên cứu và phát triển các thuật toán AI mới"
          }
        ],
        subjectCombinations: ["A00", "A01", "D01"]
      },
      {
        name: "An toàn thông tin",
        department: "Công nghệ thông tin",
        code: "ISS",
        description: "Ngành An toàn thông tin đào tạo chuyên gia bảo mật và an ninh mạng",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Bảo mật", "Lập trình", "Phân tích hệ thống"],
        advantages: ["Nhu cầu cao", "Lương hấp dẫn"],
        availableAt: ["HANOI", "HCMC"]
      },
      {
        name: "Digital Marketing",
        department: "Quản trị kinh doanh",
        code: "MKT",
        description: "Ngành Digital Marketing đào tạo chuyên gia marketing trong môi trường số, có khả năng xây dựng và triển khai chiến lược marketing trên các nền tảng kỹ thuật số.",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ với điểm trung bình từ 6.5 trở lên",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Marketing", "Sáng tạo nội dung", "Phân tích dữ liệu", "Truyền thông", "Hiểu biết về công nghệ"],
        advantages: ["Ngành mới", "Nhu cầu cao", "Kết hợp kinh doanh và công nghệ"],
        availableAt: ["HANOI", "HCMC", "DANANG"],
        programStructure: {
          preparation: {
            duration: "1 năm đầu",
            objectives: ["Nền tảng tiếng Anh", "Kiến thức kinh doanh cơ bản", "Kỹ năng mềm"],
            courses: ["Nhập môn marketing", "Tiếng Anh thương mại", "Nguyên lý kế toán"]
          },
          basic: {
            duration: "1.5 năm tiếp theo",
            objectives: ["Marketing cơ bản", "Công cụ digital", "Phân tích thị trường"],
            courses: ["Marketing căn bản", "SEO/SEM", "Social Media Marketing", "Content Marketing"]
          },
          ojt: {
            duration: "4 tháng",
            objectives: ["Thực tập tại agency hoặc doanh nghiệp", "Triển khai chiến dịch thực tế"]
          },
          specialization: {
            duration: "1 năm cuối",
            objectives: ["Chuyên sâu về Digital Marketing", "Chiến lược và phân tích"],
            courses: ["Phân tích dữ liệu marketing", "Quản trị thương hiệu số", "Chiến lược Digital Marketing", "E-commerce"]
          }
        },
        careerProspects: [
          {
            title: "Digital Marketing Specialist",
            description: "Xây dựng và triển khai chiến dịch marketing trên các kênh số"
          },
          {
            title: "Content Manager",
            description: "Quản lý và phát triển nội dung cho các nền tảng số"
          },
          {
            title: "Marketing Analytics",
            description: "Phân tích dữ liệu và đo lường hiệu quả chiến dịch marketing"
          }
        ],
        subjectCombinations: ["A00", "A01", "D01", "D07"]
      },
      {
        name: "Kinh doanh quốc tế",
        department: "Quản trị kinh doanh",
        code: "IB",
        description: "Ngành Kinh doanh quốc tế đào tạo chuyên gia về thương mại và kinh doanh toàn cầu",
        totalCredits: 144,
        admissionCriteria: "Xét tuyển theo điểm thi THPT hoặc học bạ",
        tuition: {
          firstSem: 31600000,
          midSem: 33600000,
          lastSem: 35800000
        },
        requiredSkills: ["Ngoại ngữ", "Đàm phán", "Phân tích thị trường"],
        advantages: ["Cơ hội làm việc quốc tế", "Thu nhập cao"],
        availableAt: ["HANOI", "HCMC"]
      }
    ];
    

    

    await Major.deleteMany({}); 
    await Major.insertMany(majors);
    
    console.log(`Đã thêm ${majors.length} ngành học vào database`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedMajors();