module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    message: DataTypes.STRING
  });
  return Message;
};
