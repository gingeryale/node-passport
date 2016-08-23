var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	}
});
userSchema.pre('save', function(next){
	//check if new passw
	if(!this.isModified('passowrd')){
		return next();
	}
	var user = this;
	// init encrypt
	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}
		// success salt value
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err){
			return next(err);
		}
		// sucess encrypt
		user.password = hash;
		next();
		console.log('encrypted bcrypt');
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, next){
	// compare saved encrypted password
	// to user password
	bcrypt.compare
	(candidatePassword, this.password, function(err, isMatch){
		if(err){
			return next(err)
		}
		next(null, isMatch);
	});
}

var User = mongoose.model('User', userSchema);


module.exports = User;


