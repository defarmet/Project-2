var passport = require("passport");
var local_strategy = require("passport-local").Strategy;
var sha512 = require("salted-sha512");
var db = require("./models");

module.exports = function()
{
	passport.use(new local_strategy(function(username, password, done)
	{
		password = sha512(password, username);
		db.User.findOne({
			where: {
				username: username
			}
		}).then(function(response)
		{
			if (!response) {
				return done(null, false, {
					message: "Incorrect Username"
				});
			}

			var user = response.dataValues;
			if (user.password !== password) {
				return done(null, false, {
					message: "Incorrect Password"
				});
			}

			return done(null, user);
		});
	}));

	passport.serializeUser(function(user, done)
	{
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done)
	{
		db.User.findOne({
			where: {
				id: id
			}
		}).then(function(response)
		{
			done(null, response.dataValues);
		});
	});
}
