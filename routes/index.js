var express = require('express');
var router = express.Router();

// //check when log in.
// // // Get index page
// router.get('/', ensureAuthenticated, function(req, res){
// 	res.render('index',{
// 		title: 'WELCOME'
// 	});
// 	console.log("ehrW>?");
// });

// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		// res.redirect('/register/signin');
// 	}
// }

router.get('/', function(req, res) {
	res.render('index', {title: 'SOCIAL-NETWORK' });
  });
  

module.exports = router;