const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
};
