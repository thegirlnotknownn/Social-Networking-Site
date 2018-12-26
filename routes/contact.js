var express = require('express');
var router = express.Router();

var Feedback = require('../models/Feedback');

// Get contactpage
router.get('/', function(req, res){
	res.render('contactus',{
        title: 'ContactUS'
    });
});

//take feedback
router.post('/feedback', function(req,res){
	var fb = new Feedback({
		fname:req.body.fname,
		femail:req.body.femail,
		subject:req.body.subject,
		message:req.body.message
	});
	fb.save(function(err,fdata){
		if (err) return console.log(err)
		console.log(fdata);
		console.log("got the feedback");
		res.redirect('/');
	})
});

module.exports = router;