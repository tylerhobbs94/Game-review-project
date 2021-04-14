var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/search', function(req, res, next) {
  axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${req.query.search}`)
});

module.exports = router;
