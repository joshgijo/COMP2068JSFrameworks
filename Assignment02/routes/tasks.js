const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware: ensure authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/auth/login');
}

// Private tasks list (with search)
router.get('/', ensureAuthenticated, async (req, res) => {
  const q = req.query.q ? req.query.q.trim() : '';
  const filter = { owner: req.user._id };

  if (q) {
    // keyword search on title or description
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  try {
    const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();
    res.render('tasks', { tasks, q, title: 'My Tasks' });
  } catch (err) {
    req.flash('error_msg', 'Error loading tasks');
    res.redirect('/');
  }
});

// add form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add-task');
});

// add post
router.post('/add', ensureAuthenticated, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const errors = [];
  if (!title) errors.push({ msg: 'Title is required' });
  if (errors.length) return res.render('add-task', { errors, title, description, dueDate });

  try {
    const task = new Task({
      title,
      description,
      dueDate: dueDate || undefined,
      owner: req.user._id
    });
    await task.save();
    req.flash('success_msg', 'Task added');
    res.redirect('/tasks');
  } catch (err) {
    req.flash('error_msg', 'Error adding task');
    res.redirect('/tasks');
  }
});

// edit form
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id }).lean();
    if (!task) {
      req.flash('error_msg', 'Task not found');
      return res.redirect('/tasks');
    }
    res.render('edit-task', { task });
  } catch (err) {
    req.flash('error_msg', 'Error');
    res.redirect('/tasks');
  }
});

// edit put
router.put('/edit/:id', ensureAuthenticated, async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  try {
    const t = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!t) {
      req.flash('error_msg', 'Task not found');
      return res.redirect('/tasks');
    }
    t.title = title;
    t.description = description;
    t.dueDate = dueDate || undefined;
    t.completed = !!completed;
    await t.save();
    req.flash('success_msg', 'Task updated');
    res.redirect('/tasks');
  } catch (err) {
    req.flash('error_msg', 'Error updating task');
    res.redirect('/tasks');
  }
});

// delete with confirmation (client-side prompt)
router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id, owner: req.user._id });
    req.flash('success_msg', 'Task deleted');
    res.redirect('/tasks');
  } catch (err) {
    req.flash('error_msg', 'Error deleting task');
    res.redirect('/tasks');
  }
});

module.exports = router;
