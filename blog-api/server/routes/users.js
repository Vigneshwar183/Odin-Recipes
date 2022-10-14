var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const postController = require('../controllers/postController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/profile', (req, res, next)=>{
  res.send('req.user')
})

router.post('/posts', postController.post_list_user_get)

router.post('/createPost', postController.post_form_post)

router.post('/deletePost', postController.post_delete)

router.post('/publishPost', postController.post_publish)

router.post('post', postController.post_get)

module.exports = router;
