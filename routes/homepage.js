var express = require('express');
var router = express.Router();
var User = require('../models/Userdata');
var Post = require('../models/Postdata');
var Comment = require('../models/Commentdata');


// ADDDDDDDDDDDD
// ******************************************************************
router.post('/postinfo', function(req,res){
    var postdata = new Post({
        poster : req.body.poster,
        post_desc : req.body.post_desc
    });
    console.log("wtf?");
    postdata.save(function(err,pdata){
        if(err) console.log(err);
        console.log(pdata);
        console.log("Post saved!");
    });
    res.redirect('/homepage');
});

router.post('/comment', function(req,res){
    var commentdata = new Comment({
        cid:req.body.o,
        commentor : req.body.commentor,
        comment : req.body.comment
    });
    console.log("startinggg");
    commentdata.save(function(err,cdata){
        if(err) console.log(err);
        console.log(cdata);
        console.log("Comment Saved");
    });
    
    res.redirect('/homepage');
});

// SHOWWWWWWWWWW
// ***************************************************************

// show-------------hotel
router.get('/',function(req,res){
    User.find({},function(err,user){
        console.log("this is showing comment  start");
        console.log("do you get me?");
        Post.find({},function(err,docs){
            console.log(user);
            console.log(docs);
            console.log(user[0].name);
            if(err) return console.log(err)
            console.log("inside show comment: inside post");
            Comment.find({},function(err,data){// Comment.find({'id':docs[entry]._id}, function(err,data){
                if(err) return console.log(err)
                    res.render('homepage',{
                        docs:docs,
                        data:data
                    });
                console.log("inside show comment: inside post: inside comment");
                console.log(data);
                console.log("am i being shown");
            });
         });
        console.log("this is showing comment end");
    });
});
    

// // hellomoto----------showposts
// router.get('/', function(req,res){
//     console.log("here???");
//     Post.find({}, function(err, docs){
//         if(err) return console.log(err);
//         res.render('homepage',{
//             docs:docs
//         });
//         // console.log(docs[x]);
//         console.log("showing post!1");
//     });
//     console.log("this is showing post end");
// });

// // ************************************************************************
// //comments cannot be updated. only the posts can :: if changes needed later do it!
// router.put('/updatepost', function(req,res){
//     post_desc = req.body.post_desc;
//     date_updated = Date.now();
//     if(err) console.log(err);
//     else
//         console.log("Post updated");
// })

module.exports = router;