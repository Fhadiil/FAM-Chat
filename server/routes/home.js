var express = require('express');
var router = express.Router(),
  homeControllers = require('../controllers/homeControllers')

/* GET home page. */
router.get('/', homeControllers.homeGET);

module.exports = router;