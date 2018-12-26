var mongoose = require('mongoose').set('debug',true);
var Schema = mongoose.Schema;
var Comment = ('./Commentdata');

var postSchema = new Schema({
    post_desc:String,
    date_created:{type:Date,default:Date.now},
    poster: String,
    commentSchema : [{type:mongoose.Schema.ObjectId, ref:'Comment'}]
},{collection:'postdata'});
var Post = module.exports = mongoose.model("Post",postSchema);
