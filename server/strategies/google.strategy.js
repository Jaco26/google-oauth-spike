const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../modules/pool');

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/auth/google/redirect',

  }, function (accessToken, refreshToke, profile, done) {
    // passport callback function
    
    // Check to see if the user is already in my database using the "profile.id"
    pool.query(`SELECT * FROM users WHERE google_id = $1;`, [profile.id])
      .then(result => {
        // If they are not, put them in
        if (result.rows.length == 0) {
          pool.query(`INSERT INTO users (display_name, google_id) VALUES ($1, $2)`, 
          [profile.displayName, profile.id])
            .then(result => {
              console.log('***$$$ Registered new user!');
              // upon inserting new user into the database, find them and call done(null, foundUser)
              pool.query(`SELECT * FROM users WHERE google_id = $1`, [profile.id])
                .then(result => {
                  if (result.rows.length === 0) {
                    done(null, false)
                  } else {
                    let foundUser = result.rows[0];
                    console.log('FOUND USER', foundUser);

                    done(null, foundUser);
                  }
                }).catch(err => {
                  console.log('Error in new user post', err);
                  done(null, false);
                })
            })
            .catch(err => {
              console.log('Error in new user post', err);
              done(null, false);
            });
        } else {
          let foundUser = result.rows[0];
          console.log('FOUND USER', foundUser);
          
          done(null, foundUser);
        }
      })
      .catch(err => {
        console.log('Error in new user post', err);
        done(null, false)
      });
}));

passport.serializeUser( function(user, done) {
  done(null, user.id);
});

passport.deserializeUser( function(id, done) {
  pool.query(`SELECT * FROM users WHERE id = $1;`, [id], function(err, result) {
    if (err) {
      console.log('Query err', err);
      done(err);
    } 

    user = result.rows[0];

    if(!user) {
       done(null, false,{message: 'Incorrect credentials'});
    } else {
      done(null, user)
    }
  });
});

module.exports = passport;