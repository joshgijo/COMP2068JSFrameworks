const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home - My Portfolio',
        active: 'home'
    });
});

// About page route
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me - My Portfolio',
        active: 'about'
    });
});

// Projects page route
router.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Projects - My Portfolio',
        active: 'projects'
    });
});

// Contact page route
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me - My Portfolio',
        active: 'contact'
    });
});

// Handle contact form submission
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Here you would typically save to database or send email
    console.log('Contact form submission:', { name, email, message });
    res.render('contact', {
        title: 'Contact Me - My Portfolio',
        active: 'contact',
        message: 'Thank you for your message! I will get back to you soon.'
    });
});

module.exports = router;