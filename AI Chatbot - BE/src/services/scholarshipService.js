const Scholarship = require("../models/Scholarship");
const School = require("../models/School");

async function getAllScholarships() {
  return await Scholarship.findAll({
    include: [
      {
        model: School,
        attributes: ["SchoolID", "Name", "Location", "Website"],
      },
    ],
  });
}

async function createScholarship(data) {
  return await Scholarship.create(data);
}

async function deleteScholarship(id) {
  const deleted = await Scholarship.destroy({ where: { ScholarshipID: id } });
  return deleted; // trả về số bản ghi đã xóa (0 hoặc 1)
}

module.exports = { getAllScholarships, createScholarship, deleteScholarship };
