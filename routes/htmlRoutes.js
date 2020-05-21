var Book = require("../models");

module.exports = function(app) {
  // Load index page
 /* app.get("/", function(req, res) {
    Book.findAll().then(function(results) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });*/

// Display add form
app.get('/add', (req, res) => res.render('add'));
  

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};