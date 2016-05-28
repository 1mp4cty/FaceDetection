module.exports = function(sequelize, DataTypes) {
  var day = sequelize.define('day', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    photo: DataTypes.STRING
  }
);
  return day;
};
