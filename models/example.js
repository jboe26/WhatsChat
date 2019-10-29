module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false, // do not allow null
      validate: {
        len: [1] //minimum 1 character
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false, // do not allow null/empty
      validate: {
        len: [4] // minimum 4 characters
      }
    },
    key: DataTypes.INTEGER
  });
  return User;
};
