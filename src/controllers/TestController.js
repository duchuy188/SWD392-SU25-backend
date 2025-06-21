const Test = require('../models/Test');
const User = require('../models/User');
const Major = require('../models/Major');

const TestController = {

  async getTests(req, res) {
    try {
      const tests = await Test.find({}, 'name type description');
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async getTestById(req, res) {
    try {
      const test = await Test.findById(req.params.id);
      if (!test) {
        return res.status(404).json({ error: 'Không tìm thấy bài test' });
      }
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

 
  async submitTest(req, res) {
    try {
      const { answers } = req.body;
      const testId = req.params.id;
      const userId = req.user.id;

    
      const test = await Test.findById(testId);
      if (!test) {
        return res.status(404).json({ error: 'Không tìm thấy bài test' });
      }

      // Tính toán kết quả
      let result;
      if (test.type === 'PERSONALITY') {
        result = calculateMBTIResult(test, answers);
      } else if (test.type === 'CAREER') {
        result = calculateHollandResult(test, answers);
      } else {
        result = { type: 'Unknown', score: 0 };
      }


      await User.findByIdAndUpdate(
        userId,
        { 
          $push: { 
            testResults: {
              testId,
              testName: test.name,
              testType: test.type,
              result: result.type,
              score: result.score,
              date: new Date()
            } 
          } 
        }
      );

  
      const detailedResult = test.results.find(r => r.type === result.type);


      if (!detailedResult) {
        return res.status(200).json({
          result: result.type,
          description: '',
          recommendedMajors: [],
          recommendedFPTMajors: []
        });
      }

      const recommendedMajors = await Major.find({
        _id: { $in: detailedResult.recommendedMajors }
      });

      const recommendedFPTMajors = await Major.find({
        _id: { $in: detailedResult.recommendedFPTMajors }
      });

      res.status(200).json({
        result: result.type,
        description: detailedResult.description || '',
        recommendedMajors: recommendedMajors.map(m => ({ id: m._id, name: m.name, code: m.code })),
        recommendedFPTMajors: recommendedFPTMajors.map(m => ({ id: m._id, name: m.name, code: m.code }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async getMyTestResults(req, res) {
    try {
      const userId = req.user.id; 

      const user = await User.findById(userId).populate('testResults.testId');
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      res.status(200).json(user.testResults);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTestResultById(req, res) {
    try {
      const userId = req.user.id;
      const resultId = req.params.resultId;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      
  
      const testResult = user.testResults.find(
        result => result._id.toString() === resultId
      );
      
      if (!testResult) {
        return res.status(404).json({ error: 'Không tìm thấy kết quả bài test' });
      }
    
      const test = await Test.findById(testResult.testId);
      if (!test) {
        return res.status(404).json({ error: 'Không tìm thấy bài test' });
      }
      

      const detailedResult = test.results.find(r => r.type === testResult.result);
      if (!detailedResult) {
        return res.status(200).json({
          ...testResult.toObject(),
          description: '',
          recommendedMajors: [],
          recommendedFPTMajors: []
        });
      }
      
      const recommendedMajors = await Major.find({
        _id: { $in: detailedResult.recommendedMajors }
      });

      const recommendedFPTMajors = await Major.find({
        _id: { $in: detailedResult.recommendedFPTMajors }
      });
      
      res.status(200).json({
        ...testResult.toObject(),
        testName: test.name,
        description: detailedResult.description || '',
        recommendedMajors: recommendedMajors.map(m => ({ id: m._id, name: m.name, code: m.code })),
        recommendedFPTMajors: recommendedFPTMajors.map(m => ({ id: m._id, name: m.name, code: m.code }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Hàm tính toán kết quả MBTI
function calculateMBTIResult(test, answers) {
  // Khởi tạo điểm cho từng chiều
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
  
  console.log("MBTI Answers received:", answers);
  
  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const answerValue = parseInt(answer.answer);
    
    const question = test.questions.find(q => q._id.toString() === questionId);
    
    if (!question) {
      console.log("Không tìm thấy câu hỏi với ID:", questionId);
      return;
    }
    
    // Xác định category dựa vào vị trí câu hỏi trong mảng questions
    const index = test.questions.findIndex(q => q._id.toString() === questionId);
    let category;
    
    if (index < 5) category = 'EI';
    else if (index < 10) category = 'SN';
    else if (index < 15) category = 'TF';
    else category = 'JP';
    
    console.log("Xử lý câu hỏi MBTI:", question.question, "- Vị trí:", index, "- Category:", category, "- Answer:", answerValue);
    
    // Tính điểm dựa vào category đã xác định
    switch (category) {
      case 'EI':
        if (answerValue === 0) e += question.weight || 1;
        else i += question.weight || 1;
        break;
      case 'SN':
        if (answerValue === 0) s += question.weight || 1;
        else n += question.weight || 1;
        break;
      case 'TF':
        if (answerValue === 0) t += question.weight || 1;
        else f += question.weight || 1;
        break;
      case 'JP':
        if (answerValue === 0) j += question.weight || 1;
        else p += question.weight || 1;
        break;
    }
  });
  
  console.log("Điểm MBTI:", { e, i, s, n, t, f, j, p });
  
  // Xác định loại MBTI
  const type = 
    (e > i ? 'E' : 'I') +
    (s > n ? 'S' : 'N') +
    (t > f ? 'T' : 'F') +
    (j > p ? 'J' : 'P');
  
  console.log("Kết quả MBTI:", type);
  
  return { 
    type, 
    score: { e, i, s, n, t, f, j, p } 
  };
}

function calculateHollandResult(test, answers) {
  let r = 0, i = 0, a = 0, s = 0, e = 0, c = 0;
  
  console.log("Holland Answers received:", answers);
  
  // Đếm số câu hỏi mỗi loại để tính điểm trung bình
  let rCount = 0, iCount = 0, aCount = 0, sCount = 0, eCount = 0, cCount = 0;
  
  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const answerValue = parseInt(answer.answer);
    
    const question = test.questions.find(q => q._id.toString() === questionId);
    
    if (!question) {
      console.log("Không tìm thấy câu hỏi với ID:", questionId);
      return;
    }
    
    console.log("Xử lý câu hỏi Holland:", question.question, "- Category:", question.category, "- Answer:", answerValue);
    
    // Đảm bảo answerValue là một số hợp lệ
    if (isNaN(answerValue)) {
      console.log("Giá trị answer không hợp lệ:", answer.answer);
      return;
    }
    
    // Cộng điểm vào nhóm tương ứng
    switch (question.category) {
      case 'R': 
        r += answerValue * (question.weight || 1); 
        rCount++;
        break;
      case 'I': 
        i += answerValue * (question.weight || 1); 
        iCount++;
        break;
      case 'A': 
        a += answerValue * (question.weight || 1); 
        aCount++;
        break;
      case 'S': 
        s += answerValue * (question.weight || 1); 
        sCount++;
        break;
      case 'E': 
        e += answerValue * (question.weight || 1); 
        eCount++;
        break;
      case 'C': 
        c += answerValue * (question.weight || 1); 
        cCount++;
        break;
      default:
        console.log("Category không hợp lệ:", question.category);
    }
  });
  
  // Tính điểm trung bình nếu có số câu hỏi khác nhau
  const rAvg = rCount > 0 ? r / rCount : 0;
  const iAvg = iCount > 0 ? i / iCount : 0;
  const aAvg = aCount > 0 ? a / aCount : 0;
  const sAvg = sCount > 0 ? s / sCount : 0;
  const eAvg = eCount > 0 ? e / eCount : 0;
  const cAvg = cCount > 0 ? c / cCount : 0;
  
  // Log điểm số từng chiều
  console.log("Điểm Holland (tổng):", { r, i, a, s, e, c });
  console.log("Số câu hỏi mỗi loại:", { rCount, iCount, aCount, sCount, eCount, cCount });
  console.log("Điểm Holland (trung bình):", { rAvg, iAvg, aAvg, sAvg, eAvg, cAvg });
  
  const scores = { 
    Realistic: r, 
    Investigative: i, 
    Artistic: a, 
    Social: s, 
    Enterprising: e, 
    Conventional: c 
  };
  
  // Tìm điểm cao nhất
  const maxScore = Math.max(r, i, a, s, e, c);
  
  // Tìm tất cả các nhóm có điểm cao nhất
  const maxTypes = [];
  if (r === maxScore) maxTypes.push('Realistic');
  if (i === maxScore) maxTypes.push('Investigative');
  if (a === maxScore) maxTypes.push('Artistic');
  if (s === maxScore) maxTypes.push('Social');
  if (e === maxScore) maxTypes.push('Enterprising');
  if (c === maxScore) maxTypes.push('Conventional');
  
  console.log("Các nhóm có điểm cao nhất:", maxTypes);
  
  // Nếu có nhiều nhóm cùng điểm cao nhất, chọn một cách ngẫu nhiên hoặc ưu tiên theo thứ tự
  // Ở đây tôi chọn cách ưu tiên theo thứ tự RIASEC
  const priorityOrder = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
  const type = maxTypes.sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b))[0];
  
  console.log("Kết quả Holland cuối cùng:", type);
  
  return { 
    type, 
    score: scores 
  };
}

module.exports = TestController;