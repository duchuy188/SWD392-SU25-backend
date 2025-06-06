const scholarshipService = require("../services/scholarshipService");

async function getScholarships(req, res) {
  try {
    const scholarships = await scholarshipService.getAllScholarships();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getScholarships };
