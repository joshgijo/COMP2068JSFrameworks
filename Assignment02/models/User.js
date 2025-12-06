const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String }, // for GitHub or custom
  email: { type: String, lowercase: true },
  password: { type: String }, // hashed for local users
  githubId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
