var express = require('express');
var router = express.Router(),
userRouter = require('./users'),
homeRouter = require('./home');

/******************************************** USE BIND ALL ROUTES ***********************************/

router.use('/',homeRouter);
router.use('/users',userRouter);


module.exports = router