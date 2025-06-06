const schoolService = require("../services/schoolService");

async function getSchools(req, res) {
  try {
    const schools = await schoolService.getAllSchools();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getSchools };
