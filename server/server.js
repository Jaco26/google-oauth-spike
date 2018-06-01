const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// require routes
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('dist'));


// use routes
app.use('/auth', authRoutes)





const users = [
  {name: 'Jacob', id: 1}
];

app.get('/api/:id', (req, res) => {
  console.log('*************************************',req.params.id);
  
  let user = users.filter(user => user.id == req.params.id);
  res.send(user);
})




const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Server listening on port:', port);
});