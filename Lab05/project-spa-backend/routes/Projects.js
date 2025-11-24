const express = require('express');
const router = express.Router();
const Project = require('../models/project'); 

// GET all projects
router.get('/', function(req, res, next) {
  Project.find((err, projects) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(projects);
  });
});

// POST create new project
router.post('/', function(req, res, next) {
  const project = req.body;

  Project.create(project, (err, created) => {
    if (err) {
      console.error('Create project error:', err);
      return res.status(501).json({ error: err });
    }
    return res.status(201).json(created);
  });
});

// DELETE by id '/:_id'
router.delete('/:_id', function(req, res, next) {
  const id = req.params._id;
  Project.remove({ _id: id }, (err) => {
    if (err) {
      console.error('Delete project error:', err);
      return res.status(400).json({ error: err });
    }
    // 204 No Content
    return res.status(204).send();
  });
});

// PUT update project 
router.put('/', function(req, res, next) {
  const project = req.body;
  if (!project._id) {
    return res.status(400).json({ error: 'Missing _id in request body' });
  }

  Project.findOneAndUpdate({ _id: project._id }, project, { new: true }, (err, updated) => {
    if (err) {
      console.error('Update project error:', err);
      return res.status(400).json({ error: err });
    }
    return res.status(202).json(updated);
  });
});

module.exports = router;
