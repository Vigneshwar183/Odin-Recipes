var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const postsController = require('../controllers/postsController');
const { ResultWithContext } = require('express-validator/src/chain');

/* GET home page. */
router.get('/', userController.index_get)

router.post('/', postsController.delete_post)

router.get('/sign-up', userController.sign_up_get)

router.post('/sign-up', userController.sign_up_post)

router.get('/login', userController.login_get)

router.post('/login', userController.login_post)

router.get('/logout', userController.logout)

router.get('/create_posts', postsController.create_posts_get)

router.post('/create_posts', postsController.create_posts_post)

router.get('/member_form', userController.member_form_get)

router.post('/member_form', userController.member_form_post)

router.get('/admin_form', userController.admin_form_get)

router.post('/admin_form', userController.admin_form_post)

module.exports = router;
