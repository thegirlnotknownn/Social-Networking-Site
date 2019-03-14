var express = require('express');
var router = express.Router();
var User = require('../models/Userdata');
var Post = require('../models/Postdata');
var Comment = require('../models/Commentdata');

// add post
router.post('/postinfo', function(req,res){
    var postdata = new Post({
        poster : req.body.poster,
        post_desc : req.body.post_desc
    });
    postdata.save(function(err,pdata){
        if(err) console.log(err);
        // console.log(pdata);
        // console.log("Post saved!");
    });
    res.redirect('/homepage');
});

// add comment
router.post('/comment', function(req,res){
    var commentdata = new Comment({
        cid:req.body.o,
        commentor : req.body.commentor,
        comment : req.body.comment
    });
    commentdata.save(function(err,cdata){
        if(err) console.log(err);
        // console.log(cdata);
        // console.log("Comment Saved");
    });
    res.redirect('/homepage');
});

// display
router.get('/',function(req,res){
    User.find({},function(err,user){
        Post.find({},function(err,docs){
            // console.log(user);
            // console.log(docs);
            if(err) return console.log(err)
            Comment.find({},function(err,data){// Comment.find({'id':docs[entry]._id}, function(err,data){
                if(err) return console.log(err)
                    res.render('homepage',{
                        docs:docs,
                        data:data
                    });
                // console.log(data);
            });
         }).lean();
    }).lean();
});

module.exports = router;