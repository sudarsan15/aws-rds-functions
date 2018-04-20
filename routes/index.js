/*

Author Name  : Sudarsan PS 
website      : www.sudarsanps.com
Description  : This is the intro page for this application , which help you perfrom various MySQL functionalites with AWS RDS
*/

var express = require('express');
var router = express.Router();

require('../shared/shared');
config.connectDB();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  

});

module.exports = router;
