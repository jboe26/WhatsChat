module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    user: DataTypes.STRING,
    message: DataTypes.STRING
  });
  return Message;
};
