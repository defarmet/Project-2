var db = require("../models");
var Op = require("sequelize");

module.exports = function(app) {
	/* Display search */
	app.get("/search", function(req, res)
	{
		if (!req.user)
			return res.redirect("/");

		res.render("usersearch");
	});

	/* Display add form */
	app.get("/add", function(req, res)
	{
		if (!req.user)
			return res.redirect("/");

		res.render("add");
	});

	app.get("/student.html", function(req, res)
	{
		if (!req.user)
			return res.redirect("/");

		res.render("student", req.user);
	});

	/* Render 404 page for any unmatched routes */
	app.get("*", function(req, res)
	{
		res.render("404");
	});
};
