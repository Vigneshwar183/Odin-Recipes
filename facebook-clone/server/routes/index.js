var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

/* GET home page. */
router.post('/', userController.getUserData);

router.post('/createPost', postController.createPost);

router.post('/getPost', postController.getPost);

router.post('/likeDislikePost', postController.likeDislikePost);

router.post('/createComment', commentController.createComment);

router.post('/viewComment', commentController.viewComment);

module.exports = router;
