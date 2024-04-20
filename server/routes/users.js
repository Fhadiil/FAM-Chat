var express = require('express');
var router = express.Router(),
userControllers = require('../controllers/userControllers'),
homeControllers = require('../controllers/homeControllers')

/* GET users listing. */

router.get('/create', userControllers.getCreateAccount,homeControllers.homeGET);
router.post('/create', userControllers.createAccount,homeControllers.homeGET);
router.get('/login', userControllers.createAccount,homeControllers.homeGET);
router.post('/login', userControllers.login,homeControllers.homeGET);

module.exports = router;
