const express = require('express');
const router = express.Router();
const Major = require('../models/Major');

// Get all majors
router.get('/', async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one major
router.get('/:id', async (req, res) => {
  try {
    const major = await Major.findById(req.params.id);
    if (!major) return res.status(404).json({ message: 'Major not found' });
    res.json(major);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
