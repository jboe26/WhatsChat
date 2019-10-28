module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Example;
};
