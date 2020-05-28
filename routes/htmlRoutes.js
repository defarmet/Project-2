var Book = require("../models");

module.exports = function(app) {

// Display add form
app.get('/add', (req, res) => res.render('add'));
//display search
app.get('/search', (req, res) => res.render('usersearch')); 

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};