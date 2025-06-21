const mbtiTest = {
    name: "MBTI Personality Test",
    type: "PERSONALITY",
    description: "Bài test giúp xác định 16 kiểu tính cách theo chỉ số MBTI",
    questions: [
      // Extroversion (E) vs. Introversion (I)
      {
        question: "Khi ở trong một nhóm đông người, bạn thường:",
        options: [
          "Cảm thấy năng lượng tăng lên và hào hứng",
          "Cảm thấy mệt mỏi và cần thời gian một mình để nạp năng lượng"
        ],
        weight: 1
      },
      {
        question: "Bạn thích làm việc:",
        options: [
          "Trong môi trường nhóm với nhiều tương tác",
          "Một mình hoặc với một vài người thân thiết"
        ],
        weight: 1
      },
      {
        question: "Khi gặp vấn đề, bạn thường:",
        options: [
          "Thảo luận với nhiều người để tìm giải pháp",
          "Suy nghĩ kỹ trước khi chia sẻ ý kiến"
        ],
        weight: 1
      },
      {
        question: "Trong thời gian rảnh, bạn thích:",
        options: [
          "Tham gia các hoạt động xã hội và gặp gỡ nhiều người",
          "Dành thời gian cho sở thích cá nhân hoặc với một vài người bạn thân"
        ],
        weight: 1
      },
      {
        question: "Bạn thường được mô tả là người:",
        options: [
          "Hòa đồng, dễ gần và thích giao tiếp",
          "Trầm tính, sâu sắc và thận trọng"
        ],
        weight: 1
      },
      
      // Sensing (S) vs. Intuition (N)
      {
        question: "Khi học điều mới, bạn thích:",
        options: [
          "Tập trung vào thông tin cụ thể và thực tế",
          "Tìm hiểu các mô hình và ý nghĩa tổng thể"
        ],
        weight: 1
      },
      {
        question: "Bạn thường tin tưởng vào:",
        options: [
          "Kinh nghiệm và quan sát trực tiếp",
          "Trực giác và linh cảm của bản thân"
        ],
        weight: 1
      },
      {
        question: "Khi đọc sách hoặc xem phim, bạn chú ý đến:",
        options: [
          "Các sự kiện và chi tiết cụ thể trong câu chuyện",
          "Ý nghĩa ẩn dụ và thông điệp của tác phẩm"
        ],
        weight: 1
      },
      {
        question: "Bạn thích công việc:",
        options: [
          "Có quy trình rõ ràng và kết quả cụ thể",
          "Cho phép sáng tạo và khám phá nhiều khả năng"
        ],
        weight: 1
      },
      {
        question: "Khi giải quyết vấn đề, bạn thường:",
        options: [
          "Dựa vào kinh nghiệm và phương pháp đã được chứng minh",
          "Tìm kiếm giải pháp mới và cách tiếp cận sáng tạo"
        ],
        weight: 1
      },
      
      // Thinking (T) vs. Feeling (F)
      {
        question: "Khi đưa ra quyết định quan trọng, bạn thường dựa vào:",
        options: [
          "Phân tích logic và lý trí",
          "Giá trị cá nhân và tác động đến người khác"
        ],
        weight: 1
      },
      {
        question: "Trong cuộc tranh luận, bạn thường:",
        options: [
          "Tập trung vào tính chính xác và sự nhất quán của lập luận",
          "Quan tâm đến cảm xúc và quan điểm của mọi người"
        ],
        weight: 1
      },
      {
        question: "Bạn đánh giá cao hơn:",
        options: [
          "Sự công bằng và khách quan",
          "Sự hài hòa và đồng cảm"
        ],
        weight: 1
      },
      {
        question: "Khi ai đó chia sẻ vấn đề với bạn, bạn thường:",
        options: [
          "Đưa ra lời khuyên và giải pháp thực tế",
          "Lắng nghe và hỗ trợ về mặt tinh thần"
        ],
        weight: 1
      },
      {
        question: "Bạn thích được công nhận vì:",
        options: [
          "Khả năng phân tích và giải quyết vấn đề",
          "Sự quan tâm và hỗ trợ dành cho người khác"
        ],
        weight: 1
      },
      
      // Judging (J) vs. Perceiving (P)
      {
        question: "Bạn thích cách sống:",
        options: [
          "Có kế hoạch và lịch trình rõ ràng",
          "Linh hoạt và thích nghi với tình huống"
        ],
        weight: 1
      },
      {
        question: "Đối với công việc, bạn thường:",
        options: [
          "Hoàn thành sớm trước thời hạn",
          "Hoàn thành sát thời hạn sau khi cân nhắc mọi lựa chọn"
        ],
        weight: 1
      },
      {
        question: "Bạn thích môi trường làm việc:",
        options: [
          "Có cấu trúc và quy trình rõ ràng",
          "Linh hoạt và cho phép thay đổi"
        ],
        weight: 1
      },
      {
        question: "Khi đi du lịch, bạn thích:",
        options: [
          "Lên kế hoạch chi tiết cho chuyến đi",
          "Quyết định linh hoạt theo tình hình thực tế"
        ],
        weight: 1
      },
      {
        question: "Bạn cảm thấy thoải mái hơn khi:",
        options: [
          "Mọi thứ đã được quyết định và sắp xếp",
          "Giữ nhiều lựa chọn mở"
        ],
        weight: 1
      }
    ],
    results: [
      {
        type: "ISTJ",
        description: "Người có tổ chức, đáng tin cậy, thực tế và logic. Bạn thích làm việc trong môi trường có cấu trúc rõ ràng và tuân thủ các quy tắc, quy trình. Bạn có khả năng tập trung cao và chú ý đến chi tiết.",
        recommendedMajors: [], // IDs của ngành học phù hợp
        recommendedFPTMajors: [] // IDs của ngành học FPT phù hợp
      },
      {
        type: "ISFJ",
        description: "Người chu đáo, trách nhiệm và hướng đến phục vụ người khác. Bạn thích làm việc trong môi trường ổn định, có tổ chức và quan tâm đến nhu cầu của người khác.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "INFJ",
        description: "Người có tầm nhìn sâu sắc, lý tưởng và sáng tạo. Bạn thường có trực giác tốt về con người và tình huống, đồng thời có khả năng tìm ra ý nghĩa và kết nối trong mọi việc.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "INTJ",
        description: "Nhà chiến lược - Người có tư duy phân tích, độc lập và luôn tìm cách cải thiện hệ thống. Bạn có khả năng nhìn xa trông rộng và xây dựng kế hoạch dài hạn.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ISTP",
        description: "Người thợ - Thực tế, linh hoạt và giỏi xử lý vấn đề. Bạn thích làm việc với đôi tay và có khả năng phân tích logic tốt, đặc biệt trong các tình huống khẩn cấp.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ISFP",
        description: "Người nghệ sĩ - Nhạy cảm, thân thiện và sáng tạo. Bạn sống trong hiện tại, thích tự do và thường có khả năng thẩm mỹ tốt.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "INFP",
        description: "Người lý tưởng hóa - Giàu lòng trắc ẩn, sáng tạo và hướng đến giá trị. Bạn luôn tìm kiếm ý nghĩa sâu sắc và muốn giúp đỡ người khác phát triển.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "INTP",
        description: "Nhà tư duy - Người có khả năng phân tích, sáng tạo và tò mò về mọi thứ. Bạn thích khám phá ý tưởng và xây dựng mô hình lý thuyết.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ESTP",
        description: "Người thực thi - Năng động, thích mạo hiểm và giải quyết vấn đề thực tế. Bạn thích làm việc với người khác và có khả năng thích nghi nhanh với tình huống mới.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ESFP",
        description: "Người trình diễn - Hướng ngoại, thân thiện và sống hết mình với hiện tại. Bạn thích làm việc với người khác và mang lại niềm vui cho mọi người xung quanh.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ENFP",
        description: "Người truyền cảm hứng - Nhiệt tình, sáng tạo và giàu trí tưởng tượng. Bạn thích khám phá khả năng mới và có khả năng kết nối với nhiều người khác nhau.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ENTP",
        description: "Người tranh luận - Thông minh, sáng tạo và luôn tìm kiếm thách thức trí tuệ. Bạn thích khám phá ý tưởng mới và tìm ra các giải pháp sáng tạo cho vấn đề phức tạp.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ESTJ",
        description: "Người quản lý - Có tổ chức, thực tế và quyết đoán. Bạn thích làm việc trong môi trường có cấu trúc và có khả năng quản lý con người và dự án hiệu quả.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ESFJ",
        description: "Người cung cấp - Thân thiện, hợp tác và có trách nhiệm. Bạn quan tâm đến nhu cầu của người khác và thích làm việc trong môi trường hài hòa.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ENFJ",
        description: "Người dẫn dắt - Ấm áp, có sức thuyết phục và trách nhiệm. Bạn có khả năng truyền cảm hứng và giúp đỡ người khác phát triển tiềm năng của họ.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      },
      {
        type: "ENTJ",
        description: "Người chỉ huy - Quyết đoán, logic và có khả năng lãnh đạo tự nhiên. Bạn thích lập kế hoạch dài hạn và tổ chức con người và nguồn lực để đạt được mục tiêu.",
        recommendedMajors: [],
        recommendedFPTMajors: []
      }
    ]
  };

module.exports = mbtiTest;