module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    key: DataTypes.INTEGER
  });
  return User;
};
