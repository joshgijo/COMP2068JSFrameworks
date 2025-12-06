const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Splash homepage
router.get('/', (req, res) => {
  res.render('home', { title: 'Task Tracker' });
});

// Public page: list all tasks in read-only format (no add/edit/delete).
// Show only task title and description (no owner info)
router.get('/public-tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).limit(100).lean();
    res.render('tasks', { tasks, publicView: true, title: 'Public Tasks' });
  } catch (err) {
    req.flash('error_msg', 'Error loading tasks');
    res.redirect('/');
  }
});

module.exports = router;
