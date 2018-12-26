var express = require('express');
var router = express.Router();
var User = require('../models/Userdata');
var Post = require('../models/Userdata');


router.get('/', function(req,res){
    res.render('profile');
});

router.get('/editdata', function(req,res){
    res.render('edit');
});

router.get('/deleteprofile', function(req,res){
    res.render('delete');
});


//to get the data of that user only
router.get('/showdata', function(req,res){
    User.find({}, function(err,data){
        if(err) console.log(err);
        res.render('profile',{
            user:data
        });
    });
});
//

router.post('/editdata', function(req,res){//check whether to keep them in paranthesis or not?
    console.log("in");
    User.findOneAndUpdate({email:req.body.email},{name:req.body.name, username: req.body.username, bio: req.body.bio, contact:req.body.contact}, function(err,user){
        if(err) console.log(err);
        console.log(user);
    })
    res.redirect('/profile');
    console.log("profile updated!");
});

router.post('/deleteprofile', function(req,res){
    User.findOneAndRemove({email:req.body.email}, function(err){
        if(err) console.log(err);
        console.log('profile deleted');
        res.redirect('/');
    });
});

module.exports = router;