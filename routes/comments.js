var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/:id', async (req,res) => {
  // find if the comment exist in database.
  const deleteComment = await models.Comment.findByPk(req.params.id)
  //if no comment send(404)
  if(!deleteComment){
    return res.status(404).json({
      error: "Could not find a comment with that id."
    })
  }
    //if it does not match check send error 404 ,
    if(req.session.user.id !== deleteComment.UserId){
      return res.status(401).json({
        error: "Stop trying to delete other peoples comments."
      })
    }
    // delete comment
    await deleteComment.destroy()
    //send success
    res.status(200).json({
      success:"you did it. proud of you"
    })
})

module.exports = router;
