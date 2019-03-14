var mongoose = require('mongoose').set('debug',true);
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	cid:String,
	comment:{type:String, required:true},
    commentor: {type:String, required:true},
    date_commented:{type:Date, default:Date.now}
},{collection:'commentdata'});
var Comment = module.exports = mongoose.model("Comment",commentSchema); 