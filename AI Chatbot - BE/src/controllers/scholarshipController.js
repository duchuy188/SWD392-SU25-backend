const scholarshipService = require("../services/scholarshipService");

async function getScholarships(req, res) {
  try {
    const scholarships = await scholarshipService.getAllScholarships();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createScholarship(req, res) {
  try {
    const scholarship = await scholarshipService.createScholarship(req.body);
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteScholarship(req, res) {
  try {
    const deleted = await scholarshipService.deleteScholarship(req.params.id);
    if (deleted) {
      res.json({ message: "Xóa học bổng thành công" });
    } else {
      res.status(404).json({ error: "Không tìm thấy học bổng" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getScholarships, createScholarship, deleteScholarship };
