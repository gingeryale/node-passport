var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res){
	res.render('login', {title:'Login'});
	console.log('you are here');
});

router.post('/login', function(req,res,next){
	passport.authenticate('local', function
		(err, user, info){
		if(err){
			return next(err);
			console.log('there is an error');
		}
		if(!user){
			return res.redirect('/auth/login');
			console.log('there is no user');
		}
		// user successful auth
		req.login(user, function(err){
			if(err){
				return next(err);
				console.log('there is an error');
			}
			// user success auth
			return res.redirect('/');
			console.log('200 OK');
		});
	})(req, res, next);
});

module.exports = router;




	