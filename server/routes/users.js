var express = require('express');
var router = express.Router(),
  { validationResult, check, body, query } = require('express-validator'),
  userControllers = require('../controllers/userControllers'),
  homeControllers = require('../controllers/homeControllers')

/* GET users listing. */

router.get('/create', userControllers.getCreateAccount, homeControllers.homeGET);
router.post('/create',
  body('password', 'password cannot be empty and must be greater than 3 characters')
    .notEmpty()
    .isLength({ min: 3 }),
  //
  //**************************************** VALIDATING EMAIL FIELD ********************************************/
  //
  body('username', 'Invalid Username')
    .notEmpty()
    .trim(),
  //
  //**************************************** HANDLING VALIDATION RESULT ****************************************/
  //
  (req, res, next) => {
    res.locals.valResult = validationResult(req);
    if (!res.locals.valResult.isEmpty()) {
      req.skip = true;
      console.log(req.body)
      res.locals.redirect = {
        route: '/error',
        token: res.locals.token || null,
        user: null,
        error: res.locals.valResult.errors
      }
      res.json(res.locals.redirect);
    } else {
      next();
    }
  }
  , userControllers.createAccount, homeControllers.homeGET);
router.get('/login', userControllers.createAccount, homeControllers.homeGET);
router.post('/login', userControllers.login, homeControllers.homeGET);

module.exports = router;
