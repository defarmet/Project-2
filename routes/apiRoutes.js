var passport = require("passport");
var sha512 = require("salted-sha512");
var db = require("../models");

/* Routes */

module.exports = function(app) {
	/* Get all books */
	app.get("/api/books", function(req, res)
	{
		db.Book.findAll().then(function(books)
		{
			console.log(books);
			res.json(books);
		});
	});

	/* Add a book */
	app.post("/api/new", function(req, res)
	{
		console.log("Book Data:");
		console.log(req.body);

		var new_book = {
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre,
			pages: req.body.pages
		}

		db.Book.findOne({
			where: {
				title: new_book.title,
				author: new_book.author,
				pages: new_book.pages
			}
		}).then(function(book)
		{
			if (!book) {
				db.Book.create(new_book).then(function(result)
				{
					console.log("request made");
					var data = result.dataValues;
					req.user.books.push(data)
					db.User.update({
						books: req.user.books
					}, {
						where: {
							id: req.user.id
						}
					}).then(function(result)
					{
						return res.redirect("/student.html");
					});
				});
			} else {
				var data = book.dataValues;
				req.user.books.push(data)
				db.User.update({
					books: req.user.books
				}, {
					where: {
						id: req.user.id
					}
				}).then(function(result)
				{
					return res.redirect("/student.html");
				});
			}
		});
	});

	/* Login */
	app.post("/login", passport.authenticate("local"), function(req, res)
	{
		if (!req.user.parent)
			res.redirect("/childsignup.html");
		else
			res.redirect("/student.html");
	});

	app.post("/createuser", function(req, res)
	{
		db.User.findOne({
			where: {
				username: req.body.username
			}
		}).then(function(response)
		{
			if (response)
				return res.json("username taken");

			var username = req.body.username;
			var password = req.body.password;
			var parent = null;
			if (req.user.parent)
				parent = req.user.username;

			console.log("here");
			db.User.create({
				username: username,
				password: sha512(password, username),
				parent: parent,
				books: []
			}).then(function(response)
			{
				return res.redirect("/");
			});
		});
	});
};
