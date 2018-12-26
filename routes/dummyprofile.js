var express = require('express');
var router = express.Router();
var User = require('../models/Userdata');

//for search! 
// you haven't check if the user exists or not!
router.post('/',function(req,res){
    var username = req.body.username;
    console.log(username);
    User.find({username:username},{bio:1,path:1,name:1},function(err,data){
        if(err) return console.log(err)
        console.log("where now?");
        console.log(data);
        // solve this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(data.length === 0 ){
            console.log("User Not Found");
            res.redirect('/profile');
        }
        else{
        res.render('dummyprofile',{
            data:data
        });
        console.log(this.bio);
        console.log("was this search helpful???");
    }
    });
});

module.exports = router;