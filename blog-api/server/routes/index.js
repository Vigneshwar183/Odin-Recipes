var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', postController.post_list_get);

router.post('/post/:id', postController.post_get)

module.exports = router;