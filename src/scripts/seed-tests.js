const mongoose = require('mongoose');
const Test = require('../models/Test');
const Major = require('../models/Major');
const mbtiTest = require('../data/mbti');
const hollandTest = require('../data/holland');
require('dotenv').config();

async function seedTests() {
  try {
 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const majors = await Major.find({});
    const majorMap = {};
    majors.forEach(major => {
      majorMap[major.name] = major._id;
    });
    
    // Cập nhật recommendedMajors và recommendedFPTMajors trong MBTI test
    console.log('MBTI test:', mbtiTest);
    console.log('Holland test:', hollandTest);

    console.log("Available majors:", Object.keys(majorMap));

    if (mbtiTest && mbtiTest.results && Array.isArray(mbtiTest.results)) {
      for (const result of mbtiTest.results) {
        switch (result.type) {
          case "ISTJ":
            result.recommendedMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["Hệ thống thông tin"],
              majorMap["An toàn thông tin"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["Hệ thống thông tin"]
            ];
            break;
          case "ISFJ":
            result.recommendedMajors = [
              majorMap["Digital Marketing"],
              majorMap["Kinh doanh quốc tế"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Digital Marketing"]
            ];
            break;
          case "INFJ":
            result.recommendedMajors = [
              majorMap["Tâm lý học"],
              majorMap["Thiết kế đồ họa"],
              majorMap["Ngôn ngữ học"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Thiết kế đồ họa"]
            ];
            break;
          case "INTJ":
            result.recommendedMajors = [
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Khoa học máy tính"],
              majorMap["Kiến trúc phần mềm"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Khoa học máy tính"]
            ];
            break;
          case "ISTP":
            result.recommendedMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["An toàn thông tin"],
              majorMap["Điện tử viễn thông"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["An toàn thông tin"]
            ];
            break;
          case "ISFP":
            result.recommendedMajors = [
              majorMap["Thiết kế đồ họa"],
              majorMap["Thiết kế thời trang"],
              majorMap["Nghệ thuật số"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Thiết kế đồ họa"]
            ];
            break;
          case "INFP":
            result.recommendedMajors = [
              majorMap["Ngôn ngữ học"],
              majorMap["Tâm lý học"],
              majorMap["Thiết kế đồ họa"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Ngôn ngữ Anh"],
              majorMap["Thiết kế đồ họa"]
            ];
            break;
          case "INTP":
            result.recommendedMajors = [
              majorMap["Khoa học máy tính"],
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Phân tích dữ liệu"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Khoa học máy tính"],
              majorMap["Trí tuệ nhân tạo"]
            ];
            break;
          case "ESTP":
            result.recommendedMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Marketing"],
              majorMap["Kinh doanh quốc tế"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Marketing"]
            ];
            break;
          case "ESFP":
            result.recommendedMajors = [
              majorMap["Digital Marketing"],
              majorMap["Quản trị sự kiện"],
              majorMap["Truyền thông đa phương tiện"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Digital Marketing"],
              majorMap["Truyền thông đa phương tiện"]
            ];
            break;
          case "ENFP":
            result.recommendedMajors = [
              majorMap["Truyền thông đa phương tiện"],
              majorMap["Digital Marketing"],
              majorMap["Quan hệ công chúng"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Truyền thông đa phương tiện"],
              majorMap["Digital Marketing"]
            ];
            break;
          case "ENTP":
            result.recommendedMajors = [
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Khoa học máy tính"],
              majorMap["Quản trị kinh doanh"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Khoa học máy tính"]
            ];
            break;
          case "ESTJ":
            result.recommendedMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Tài chính ngân hàng"],
              majorMap["Kế toán"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"]
            ];
            break;
          case "ESFJ":
            result.recommendedMajors = [
              majorMap["Quản trị nhân sự"],
              majorMap["Marketing"],
              majorMap["Quản trị khách sạn"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Marketing"]
            ];
            break;
          case "ENFJ":
            result.recommendedMajors = [
              majorMap["Quản trị nhân sự"],
              majorMap["Tâm lý học"],
              majorMap["Giáo dục"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"]
            ];
            break;
          case "ENTJ":
            result.recommendedMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Luật kinh tế"],
              majorMap["Kinh doanh quốc tế"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Kinh doanh quốc tế"]
            ];
            break;
        }
      }
    } else {
      console.error('mbtiTest.results không phải là mảng hoặc không tồn tại');
    }
    
    // Cập nhật recommendedMajors và recommendedFPTMajors trong Holland test
    if (hollandTest && hollandTest.results && Array.isArray(hollandTest.results)) {
      for (const result of hollandTest.results) {
        switch (result.type) {
          case "Realistic":
            result.recommendedMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["An toàn thông tin"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Kỹ thuật phần mềm"],
              majorMap["An toàn thông tin"]
            ];
            break;
          case "Investigative":
            result.recommendedMajors = [
              majorMap["Trí tuệ nhân tạo"],
              majorMap["Hệ thống thông tin"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Trí tuệ nhân tạo"]
            ];
            break;
          case "Artistic":
            result.recommendedMajors = [
              majorMap["Thiết kế đồ họa"],
              majorMap["Truyền thông đa phương tiện"],
              majorMap["Ngôn ngữ Anh"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Thiết kế đồ họa"],
              majorMap["Truyền thông đa phương tiện"]
            ];
            break;
          case "Social":
            result.recommendedMajors = [
              majorMap["Digital Marketing"],
              majorMap["Quan hệ công chúng"],
              majorMap["Ngôn ngữ Anh"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Digital Marketing"],
              majorMap["Quan hệ công chúng"]
            ];
            break;
          case "Enterprising":
            result.recommendedMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Kinh doanh quốc tế"],
              majorMap["Digital Marketing"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Quản trị kinh doanh"],
              majorMap["Kinh doanh quốc tế"]
            ];
            break;
          case "Conventional":
            result.recommendedMajors = [
              majorMap["Hệ thống thông tin"],
              majorMap["Kỹ thuật phần mềm"],
              majorMap["Luật kinh tế"]
            ];
            result.recommendedFPTMajors = [
              majorMap["Hệ thống thông tin"],
              majorMap["Kỹ thuật phần mềm"]
            ];
            break;
        }
      }
    } else {
      console.error('hollandTest.results không phải là mảng hoặc không tồn tại');
    }
    
    // Xóa các bài test cũ nếu có
    await Test.deleteMany({ type: { $in: ['PERSONALITY', 'CAREER'] } });
    
    // Import bài test MBTI
    const mbti = new Test(mbtiTest);
    await mbti.save();
    console.log('MBTI test imported successfully');
    
    // Import bài test Holland
    const holland = new Test(hollandTest);
    await holland.save();
    console.log('Holland test imported successfully');
    
    console.log('All tests imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing tests:', error);
    process.exit(1);
  }
}

seedTests();