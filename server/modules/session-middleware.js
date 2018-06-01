const cookieSession = require('cookie-session');

const serverSessionSecret = () => {
  if (!process.env.SERVER_SESSION_SECRET || process.env.SERVER_SESSION_SECRET.length < 8) {
    console.log('BAD SECRET! TRYP MAKING IT BETTER! (like, longer than 8 characters or something...)');
  } 
  return process.env.SERVER_SESSION_SECRET;
}

module.exports = cookieSession({
  secret: serverSessionSecret() || 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: true},
})