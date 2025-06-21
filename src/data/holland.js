const hollandTest = {
    name: "Holland Code Career Test",
    type: "CAREER",
    description: "Xác định sở thích nghề nghiệp theo 6 nhóm RIASEC: Realistic (Thực tế), Investigative (Nghiên cứu), Artistic (Nghệ thuật), Social (Xã hội), Enterprising (Quản lý), và Conventional (Quy ước)",
    questions: [
      // Realistic (R) - Nhóm thực tế
      {
        question: "Tôi thích làm việc với máy móc, công cụ và thiết bị",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "R",
        weight: 1
      },
      {
        question: "Tôi thích sửa chữa đồ điện tử hoặc đồ gia dụng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "R",
        weight: 1
      },
      {
        question: "Tôi thích làm việc ngoài trời hơn là trong văn phòng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "R",
        weight: 1
      },
      {
        question: "Tôi thích xây dựng hoặc tạo ra đồ vật bằng tay",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "R",
        weight: 1
      },
      {
        question: "Tôi thích các hoạt động thể chất và thể thao",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "R",
        weight: 1
      },
  
      // Investigative (I) - Nhóm nghiên cứu
      {
        question: "Tôi thích nghiên cứu và giải quyết vấn đề phức tạp",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "I",
        weight: 1
      },
      {
        question: "Tôi thích đọc sách và tài liệu khoa học",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "I",
        weight: 1
      },
      {
        question: "Tôi thích phân tích dữ liệu và tìm ra quy luật",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "I",
        weight: 1
      },
      {
        question: "Tôi thích thực hiện các thí nghiệm và kiểm tra giả thuyết",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "I",
        weight: 1
      },
      {
        question: "Tôi thích tìm hiểu cách thức hoạt động của sự vật",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "I",
        weight: 1
      },
  
      // Artistic (A) - Nhóm nghệ thuật
      {
        question: "Tôi thích các hoạt động sáng tạo như viết, vẽ, thiết kế",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "A",
        weight: 1
      },
      {
        question: "Tôi thích thể hiện bản thân qua nghệ thuật và âm nhạc",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "A",
        weight: 1
      },
      {
        question: "Tôi thích làm việc trong môi trường không có nhiều quy tắc và cấu trúc",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "A",
        weight: 1
      },
      {
        question: "Tôi thích tưởng tượng và sáng tạo ý tưởng mới",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "A",
        weight: 1
      },
      {
        question: "Tôi thích thể hiện cảm xúc và suy nghĩ của mình",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "A",
        weight: 1
      },
  
      // Social (S) - Nhóm xã hội
      {
        question: "Tôi thích giúp đỡ và hỗ trợ người khác",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "S",
        weight: 1
      },
      {
        question: "Tôi thích làm việc trong nhóm và tương tác với nhiều người",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "S",
        weight: 1
      },
      {
        question: "Tôi thích dạy hoặc đào tạo người khác",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "S",
        weight: 1
      },
      {
        question: "Tôi thích giải quyết các vấn đề xã hội và cộng đồng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "S",
        weight: 1
      },
      {
        question: "Tôi thích lắng nghe và hiểu cảm xúc của người khác",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "S",
        weight: 1
      },
  
      // Enterprising (E) - Nhóm quản lý
      {
        question: "Tôi thích thuyết phục và lãnh đạo người khác",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "E",
        weight: 1
      },
      {
        question: "Tôi thích bán hàng và tiếp thị sản phẩm",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "E",
        weight: 1
      },
      {
        question: "Tôi thích đưa ra quyết định và chịu trách nhiệm",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "E",
        weight: 1
      },
      {
        question: "Tôi thích khởi nghiệp và phát triển ý tưởng kinh doanh",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "E",
        weight: 1
      },
      {
        question: "Tôi thích đặt mục tiêu và làm việc để đạt được chúng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "E",
        weight: 1
      },
  
      // Conventional (C) - Nhóm quy ước
      {
        question: "Tôi thích làm việc với số liệu và dữ liệu",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "C",
        weight: 1
      },
      {
        question: "Tôi thích tuân theo quy trình và hướng dẫn rõ ràng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "C",
        weight: 1
      },
      {
        question: "Tôi thích sắp xếp và tổ chức thông tin",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "C",
        weight: 1
      },
      {
        question: "Tôi thích công việc đòi hỏi sự chính xác và chú ý đến chi tiết",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "C",
        weight: 1
      },
      {
        question: "Tôi thích môi trường làm việc có cấu trúc và quy tắc rõ ràng",
        options: [
          "Rất đồng ý",
          "Đồng ý",
          "Không chắc chắn",
          "Không đồng ý",
          "Rất không đồng ý"
        ],
        category: "C",
        weight: 1
      }
    ],
    results: [
      {
        type: "Realistic",
        description: "Bạn thích làm việc với đồ vật, máy móc, công cụ, thực vật hoặc động vật. Bạn thích giải quyết vấn đề thực tế và thường thích làm việc ngoài trời. Bạn có khả năng kỹ thuật và cơ khí tốt.",
        recommendedMajors: [], // IDs của ngành học phù hợp
        recommendedFPTMajors: [] // IDs của ngành học FPT phù hợp
      },
      {
        type: "Investigative",
        description: "Bạn thích nghiên cứu, phân tích, điều tra và giải quyết vấn đề. Bạn có khả năng tư duy logic và thích làm việc với ý tưởng trừu tượng. Bạn thường thích làm việc độc lập và tập trung vào việc giải quyết các vấn đề phức tạp.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "Artistic",
        description: "Bạn thích sáng tạo và thể hiện bản thân qua nghệ thuật, âm nhạc, văn học hoặc các hình thức biểu đạt khác. Bạn có khả năng tưởng tượng và thích làm việc trong môi trường không có nhiều quy tắc và cấu trúc.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "Social",
        description: "Bạn thích làm việc với người khác để giúp đỡ, hỗ trợ, dạy dỗ hoặc chăm sóc họ. Bạn có khả năng giao tiếp tốt và thích làm việc trong nhóm. Bạn quan tâm đến việc giải quyết các vấn đề xã hội.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "Enterprising",
        description: "Bạn thích lãnh đạo, thuyết phục và quản lý người khác để đạt được mục tiêu. Bạn có khả năng ra quyết định và sẵn sàng chấp nhận rủi ro. Bạn thích làm việc trong môi trường kinh doanh và thương mại.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "Conventional",
        description: "Bạn thích làm việc với dữ liệu, số liệu và chi tiết. Bạn có khả năng tổ chức và sắp xếp thông tin. Bạn thích làm việc trong môi trường có cấu trúc và quy tắc rõ ràng.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      }
    ]
  };

module.exports = hollandTest;