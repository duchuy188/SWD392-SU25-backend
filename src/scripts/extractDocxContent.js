const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function extractText() {
  try {
    const filePath = path.join(__dirname, '../../uploads/FPT_2025.docx');
    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value;
    
    // Lưu text vào file
    fs.writeFileSync(path.join(__dirname, '../data/fpt_content.txt'), text);
    
    console.log('Text extracted successfully');
    return text;
  } catch (error) {
    console.error('Error extracting text:', error);
  }
}

extractText();