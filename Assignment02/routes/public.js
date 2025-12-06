const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Public view of tasks (read-only)
router.get('/tasks', async (req, res) => {
    try {
        // Only show completed tasks in public view
        const tasks = await Task.find({ status: 'completed' })
            .populate('user', 'username displayName')
            .sort({ createdAt: -1 })
            .limit(50);
        
        res.render('public/tasks', {
            title: 'Public Tasks',
            tasks
        });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

module.exports = router;