const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  tuition: {
    firstSem: {
      type: Number,
      required: true,
      min: 0
    },
    midSem: {
      type: Number,
      required: true,
      min: 0
    },
    lastSem: {
      type: Number,
      required: true,
      min: 0
    }
  },
  isNewProgram: {
    type: Boolean,
    default: false
  },
  description: String,
  code: {
    type: String,
    required: true,
    unique: true
  },
  totalCredits: {
    type: Number,
    required: true
  },
  programStructure: {
    preparation: {
      duration: String,
      objectives: [String],
      courses: [String]
    },
    basic: {
      duration: String,
      objectives: [String],
      courses: [String]
    },
    ojt: {
      duration: String,
      objectives: [String]
    },
    specialization: {
      duration: String,
      objectives: [String],
      courses: [String]
    },
    graduation: {
      duration: String,
      objectives: [String],
      options: [String]
    }
  },
  careerProspects: [{
    title: String,
    description: String
  }],
  requiredSkills: [String],
  advantages: [String],
  availableAt: [{
    type: String,
    enum: ['HANOI', 'HCMC', 'DANANG', 'CANTHO', 'QNHON']
  }],
  internationalPartners: [{
    country: String,
    universities: [String]
  }],
  admissionCriteria: {
    type: String,
    required: true
  },
  subjectCombinations: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  scholarships: [{
    name: String,
    description: String,
    value: String
  }],
  tuitionByCampus: {
    HANOI: {
      firstSem: Number,
      midSem: Number,
      lastSem: Number
    },
    HCMC: {
      firstSem: Number,
      midSem: Number,
      lastSem: Number
    }
  }
}, {
  timestamps: true
});

const Major = mongoose.model('Major', majorSchema);
module.exports = Major;
