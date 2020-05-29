module.exports = function(sequelize, DataTypes)
{
	var Book = sequelize.define("Book", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [1]
			}
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [1]
			}
		},
		genre: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [1]
			}
		},
		pages: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validation: {
				min: 1
			}
		},
	});

	return Book;
};
