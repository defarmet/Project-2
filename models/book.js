module.exports = function(sequelize, DataTypes) {
var Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  genre: DataTypes.STRING,
  pages: DataTypes.INTEGER
  
});
return Book;
};
