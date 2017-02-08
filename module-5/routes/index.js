var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = {
  	title: 'Team Juan',
  	user: req.user
  }

  res.render('index', data);
});

module.exports = router;
