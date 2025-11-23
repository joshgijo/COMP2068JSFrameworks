const express = require('express');
const router = express.Router();
const Project = require("../models/Project");

// Dummy GET – Testing endpoint
router.get('/', async (req, res) => {
  let projects = await Project.find();
  res.status(200).json(projects);
});

module.exports = router;
