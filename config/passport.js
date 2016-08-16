var User = require('../models/user');
// var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//seed a user
var user = new User({
	username: 'abc',
	email: 'abc@abc.com',
	password: 'abc'
});
user.save(function(err, user) {
	if (err) {
		console.log(err);
	} else {
		console.log ('seeded successful')
	}
});
// session serialize
passport.serializeUser(function(user, next){
	// convert user object to session-string id
	next(null, user._id);
});
// convert session-stored id into a user object
passport.deserializeUser(function(id, next){
	User.findById(id, function(err, user){
		next(err, user);
	})
})

// strategies
var localStrategy = new LocalStrategy(
	function(username, password, next){	
		User.findOne(
			{username:username}, 
			function(err, user){
			if(err){
				return next(err);
			}
			if(!user){
				return next(null, false);
			}
			// entry matched uName and pWord in db
			user.comparePassword(password, function(err, isMatch){
				if(err){
					return next(err);
				}
				if(isMatch){
					return next(null, user)
				} else {
					return next(null, false);
				}
			})
		});
	}
);

passport.use(localStrategy);

