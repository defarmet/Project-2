var Sequelize = require("sequelize");
var db = require("../models");

// Routes

module.exports = function(app) {

 
  // Get all books

  app.get("/api/books", function(req, res) {
    db.Book.findAll()
    .then(function(books){
      console.log(books);
    })
  })
  // Add a book
  app.post("/api/new", function(req, res) {
    console.log("Book Data:");
    console.log(req.body);
    db.Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      pages: req.body.pages
    }).then(function(results) {
      console.log("request made");
      res.json(results);
      
    });
  });

  // Delete a book
  app.delete("/api/book/:id", function(req, res) {
    console.log("Book ID:");
    console.log(req.params.id);
    Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });
};
