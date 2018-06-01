const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// require('dotenv').config();

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: 'http://localhost:8081/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,

  }, 
  (token, refreshToke, profile, done) => {
    // passport callback function
    return done(null, {
      profile: profile,
      token: token,
    });
}));