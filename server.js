require("dotenv").config();
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require("passport");
var db = require("./models");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
	secret: "kidzread"
}));
app.use(passport.initialize());
app.use(passport.session());

/* Handlebars */
app.engine("handlebars", exphbs({
		defaultLayout: "main"
	}));
app.set("view engine", "handlebars");

/* Passport */
require("./passport.js")();

/* Routes */
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

var syncOptions = { force: false };

/* If running a test, set syncOptions.force to true */
/* clearing databases */
if (process.env.NODE_ENV === "test") {
	syncOptions.force = true;
}

/* Starting the server, syncing our models ---------------------------------- */
db.sequelize.sync(syncOptions).then(function()
{
	app.listen(PORT, function()
	{
		console.log("==> 🌎	Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	});
});

module.exports = app;
