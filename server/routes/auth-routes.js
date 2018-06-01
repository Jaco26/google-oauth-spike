const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  console.log('************** REQ.USER ***************', req.user);
  
  // if (req.session.token) {
  //   res.cookie('token', req.session.token);
  //   res.json({
  //     status: 'session cookie set'
  //   });
  // } else {
  //   res.cookie('token', '');
  //   res.json({
  //     status: 'session cookie not set'
  //   }) 
  // }
  
  // if(req.isAuthenticated()) {
  //   res.send(req.user);
  // } else {
  //   res.sendStatus(403);
  // }
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
})

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// callback route for google to redirect to
router.get('/google/redirect', 
  passport.authenticate('google', {failureRedirect: '/login'}), 
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/')
})



module.exports = router;