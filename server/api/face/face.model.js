module.exports = function(sequelize, DataTypes) {
  var face = sequelize.define('face', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    day_id: DataTypes.INTEGER,
    face_id: DataTypes.STRING
  }
);
  return face;
};
