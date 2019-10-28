module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return User;
};
