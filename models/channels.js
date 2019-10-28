module.exports = function(sequelize, DataTypes) {
  var Channel = sequelize.define("Channel", {
    channel: DataTypes.STRING
  });
  return Channel;
};
