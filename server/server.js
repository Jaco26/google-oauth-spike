const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('./strategies/google.strategy');
const sessionConfig = require('./modules/session-middleware');

// Passport Session Config
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('dist'));

// Route includes
const authRouter = require('./routes/auth-routes');

/** Routes */
app.use('/api/auth', authRouter)




