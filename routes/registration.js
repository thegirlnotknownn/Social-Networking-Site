var express = require('express');
var multer = require('multer');
var router = express.Router();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var async = require('async');
var crypto = require('crypto');
var smtpTransport = require('nodemailer-smtp-transport');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/Userdata');
var Post = require('../models/Postdata');

//storage engine
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
});

//upload init
var upload = multer({
    storage:storage
});

router.get('/', function(req, res){
	res.render('registration',{
        title: 'Register'
    });
});

router.get('/reset',function(req,res){
	res.render('reset');
});

router.post('/reset',function(req,res){
    var email= req.body.email;
    var password= req.body.password;
    User.findOneAndUpdate({email:email},{password:password},function(err,user){
        if (err) return console.log(err)
        // console.log(user);
    });
    // console.log("password changed");
    res.redirect('/registration/signin');
});

router.get('/signin', function(req, res){
	res.render('signin');
});

router.get('/signup', function(req, res){
	res.render('signup');
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}
			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});


router.post('/signup',upload.single('avatar'), function (req, res) {
	var name = req.body.name;
    var email = req.body.email;
    var dob = req.body.dob;
    var contact = req.body.contact;
    var gender = req.body.gender;
	var username = req.body.username;
	var password = req.body.password;
    var password2 = req.body.password2;
    var bio = req.body.bio;
    var path = req.file.path;
    // var originalname = req.file.originalname;
	// Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('contact','Contact Detail is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	if (errors) {
		res.render('signup', {
			errors: errors
		});
		// res.send("error! maybe use used username or email");
	}
	else {
		//checking for email and username if are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('signup', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						path:path,
						// originalname:originalname,
						name: name,
                        email: email,
                        dob:dob,
                        gender:gender,
                        contact:contact,
						username: username,
						password: password,
						bio:bio
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						// console.log(user);
					});
         			req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/registration/signin');
				}
			});
		});
	}
});

router.post('/signin', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/registration/signin', failureFlash: true }),function (req, res) {
	res.redirect('/registration/signin');
});

router.get('/forgot', function(req,res){
    res.render('forgot',{
        user : req.user
    });
});

router.get('/logout', function (req, res) {
	req.logout();
	res.render('logout');
});

// ***************************************************************************************************************
// ADD TOKENS TO THEM RE
// _______________________________________________________________________________
router.post('/forgot',function(req,res){
    var email = req.body.email;
    User.findOne({email:email},function(err,user){
        // ḍo something to check emial exists in the database
        if(err) return console.log(err)
            var transporter = nodemailer.createTransport({
                service : 'gmail',
                auth : {
                		user : 'userid@gmail.com',
                		pass : 'userpassword'
                }
            });
            console.log(email);
            var mailOptions = {
                to: email,
                from : 'userid@gmail.com',
                subject : 'SNS Password Reset',
                text : 'You are recieving this because you have requested the reset of your password for the account. \n\n' + 
                'Please click on the following link, or paste this into your browser to complete the prpcess:\n\n' +
                 'http://' + req.headers.host + '/registration/reset' + '\n\n' +
                'If you did not request this, someone else may have tried to access your account, report to the admin! \n'
            };
            transporter.sendMail(mailOptions, function(err,info){
                if(err) return console.log(err)
                // console.log(info);
            });
    });
    res.redirect('https://www.gmail.com');
});

module.exports = router;