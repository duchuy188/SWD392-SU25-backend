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

module.exports = { getAllScholarships };
