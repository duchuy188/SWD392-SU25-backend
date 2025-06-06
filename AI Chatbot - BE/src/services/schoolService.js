const School = require("../models/School");

async function getAllSchools() {
  return await School.findAll();
}

module.exports = { getAllSchools };
