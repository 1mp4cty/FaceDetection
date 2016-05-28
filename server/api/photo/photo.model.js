module.exports = function(sequelize, DataTypes) {
  var photo = sequelize.define('photo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    file: DataTypes.STRING
  }
);
  return photo;
};
