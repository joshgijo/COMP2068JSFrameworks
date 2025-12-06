const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// register form
router.get('/register', (req, res) => res.render('register'));

// register post
router.post('/register', async (req, res) => {
  const { email, password, password2 } = req.body;
  const errors = [];
  if (!email || !password || !password2) errors.push({ msg: 'Please fill in all fields' });
  if (password !== password2) errors.push({ msg: 'Passwords do not match' });
  if (password && password.length < 6) errors.push({ msg: 'Password must be at least 6 characters' });

  if (errors.length) {
    return res.render('register', { errors, email });
  }
  try {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      errors.push({ msg: 'Email already registered' });
      return res.render('register', { errors, email });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({ email: email.toLowerCase(), password: hashed });
    await newUser.save();
    req.flash('success_msg', 'Registration successful. You can now log in.');
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Server error');
    res.redirect('/auth/register');
  }
});

// login form
router.get('/login', (req, res) => res.render('login'));

// login post
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
});

// GitHub auth
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/tasks');
  });

module.exports = router;
