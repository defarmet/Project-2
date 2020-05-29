module.exports = function(sequelize, DataTypes)
{
	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validation: {
				len: [1]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validation: {
				len: [8]
			}
		},
		parent: {
			type: DataTypes.STRING
		},
		books: {
			type: DataTypes.JSON
		}
	});

	return User;
};
