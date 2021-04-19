var express = require('express');
var router = express.Router();
const axios = require('axios')
const models = require('../models');
const db = require('../models');

/* GET home page. */
router.get('/search',async function(req, res, next) {
  const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${req.query.search}`)
  
  res.json(response.data)
});

router.get('/detail/:slug',async function(req, res, next) {
  const response = await axios.get(`https://api.rawg.io/api/games/${req.params.slug}?key=${process.env.RAWG_API_KEY}`)
  
  res.json(response.data)
});

router.post("/detail/:slug/comments", async (req,res) => {
  // check if the game exist in API
  const response = await axios.get(`https://api.rawg.io/api/games/${req.params.slug}?key=${process.env.RAWG_API_KEY}`)
  const game = response.data
  //If no game return error
  if(!game){
    return res.status(400).json({
      error: "No game with that title"
    })
  }
  //Find / or create game in database
  const [dbGame] = await models.Game.findOrCreate({
    where: {
      slug: game.slug,

    },
    defaults:{
      slug:game.slug,
      title: game.name,
      description: game.description_raw
    }
  })
  // add comment
  const comment = await dbGame.createComment({
    text: req.body.text,
    UserId: req.session.user.id
  })
  // respond with success
  res.json(comment)
})

router.get("/detail/:slug/comments", async (req,res) => {
  const game = await models.Game.findOne({
    where: {
      slug: req.params.slug
    }
  })
  if(!game){
    return res.json([])
  }
  const comments =  await game.getComments({
    include: [{ model: models.User, attributes: ['username', 'id'] }],
  })
  
  res.json(comments)
})


router.post('/detail/:slug/review', async (req, res ) => {
  //check in the game exist in the api 
  const response = await axios.get(`https://api.rawg.io/api/games/${req.params.slug}?key=${process.env.RAWG_API_KEY}`)
  const game = response.data
  
  //if no game return error
  if(!game){
    return res.status(400).json({
      error: "No game with that title"
    })
  }
  //Find / or create game in database
  const [dbGame] = await models.Game.findOrCreate({
    where: {
      slug: game.slug,

    },
    defaults:{
      slug:game.slug,
      title: game.name,
      description: game.description_raw
    }
  })
  // add review
  const review = await dbGame.createReview({
    number: req.body.number,
    UserId: req.session.user.id
  })
  //respond with success 
  res.json(review)
})

router.get("/detail/:slug/review", async (req,res) => {
  const game = await models.Game.findOne({
    where: {
      slug: req.params.slug
    }
  })
  if(!game){
    return res.json([])
  }
  const reviews =  await game.getReviews({
    include: [{ model: models.User, attributes: ['username', 'id'] }],
  })
  
  res.json(reviews)
})


module.exports = router;
