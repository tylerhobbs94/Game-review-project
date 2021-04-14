var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const { Router } = require('express');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req,res) => {
  //if they dont include a username or password send back an error
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({
      error:' Please type in a username and password.'
    })
  }
// find user in db
  const user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
//check if username is being used
  if(user) {
    return res.status(400).json({
      error: "Username already in use"
    })
  }
// hash the password 15 times.
const hash = await bcrypt.hash(req.body.password ,10)


 const newUser = await models.User.create({
   username: req.body.username,
   password: hash
 })
return res.status(201).json({
  id: newUser.id,
  username: newUser.username,
  updatedAt: newUser.updatedAt
})


})

router.post('/login', async (req, res) => {
  // check for username /password
  if(!req.body.username || !req.body.password) {
    // if not there , send error
    return res.status(400).json({
      error: 'Please include username and password'
    });
  }
// check for username and password on request.
// check database for existing user
const user = await models.User.findOne({
  where: {
    username: req.body.username 
  }
})
  // find user from username
  //if no, user send error
  if(!user){
    return res.status(404).json({
      error: "no user with that username found"
    })
  }
  //check password
  const match = await bcrypt.compare(req.body.password, user.password)
  //if no match, send error

if(!match){
  return res.status(401).json({
    error: 'Password incorrect'
  })
}
  //store user info in session
  req.session.user = user;


  //respond with user info
  res.json({
    id: user.id,
    username: user.username,
    updatedAt: user.updatedAt
  })
})

router.get('/logout', (req,res) => {
req.session.user = null
res.json({
  success:"User has logged out."
})
})

router.get('/current', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      updatedAt: user.updatedAt
    })
  } else {
    res.status(401).json({
      error: 'Not logged in',
    })
  }
})
module.exports = router;
