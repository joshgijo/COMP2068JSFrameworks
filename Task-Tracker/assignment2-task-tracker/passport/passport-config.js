const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { githubClientID, githubClientSecret, githubCallbackURL } = require('../config/keys');

module.exports = function(passportInstance) {

  // Serialize & deserialize
  passportInstance.serializeUser((user, done) => {
    done(null, user.id);
  });

  passportInstance.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Local strategy
  passportInstance.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return done(null, false, { message: 'No user with that email' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      return done(null, false, { message: 'Incorrect password' });
    } catch (err) {
      return done(err);
    }
  }));

  // GitHub strategy
  if (githubClientID && githubClientSecret) {
    passportInstance.use(new GitHubStrategy({
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackURL
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (user) return done(null, user);

        // If email available try to link by email
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;

        user = await User.findOne({ email });
        if (user) {
          user.githubId = profile.id;
          await user.save();
          return done(null, user);
        }

        // create new user
        const newUser = new User({
          username: profile.username || profile.displayName,
          email: email || undefined,
          githubId: profile.id
        });
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }));
  }
};
