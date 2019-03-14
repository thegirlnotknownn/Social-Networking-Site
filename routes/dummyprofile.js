var express = require('express');
var router = express.Router();
var User = require('../models/Userdata');

//for search! 
router.post('/',function(req,res){
    var username = req.body.username;
    // console.log(username);
    User.find({username:username},{bio:1,path:1,name:1},function(err,data){
        if(err) return console.log(err)
        // console.log(data);
        if(data.length === 0 ){
            console.log("User Not Found. Redirecting back to ur profile");
            res.redirect('/profile');
        }
        else{
        res.render('dummyprofile',{
            data:data
        });
    }
    }).lean();
});

module.exports = router;