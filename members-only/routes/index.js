var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const postsController = require('../controllers/postsController')

/* GET home page. */
router.get('/', (req,res,next)=>{
  res.render('index',{ title: 'Home'})
})

router.get('/sign-up', userController.sign_up_get)

router.post('/sign-up', userController.sign_up_post)

router.get('/login', userController.login_get)

router.post('/login', userController.login_post)

module.exports = router;
