var mongoose = require('mongoose').set('debug',true);
var bcrypt = require('bcryptjs');

var Post = require('./Postdata');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username : {type:String,required:true, unique:true},
    dob:{type:Date},
    password:{type:String,required:true},
    // resetPasswordToken : String,
    // resetPasswordExpires :Date,
    contact:Number,
    path: String,
    // path2:String, //just in case you wish for cover pic buddy! xtra
    originalname:String,
    gender:String,
    bio:String
},{collection:'userdata'});
var User = mongoose.model("User",userSchema);

User.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

User.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

User.getUserById = function(id, callback){
	User.findById(id, callback);
}

User.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports = User;