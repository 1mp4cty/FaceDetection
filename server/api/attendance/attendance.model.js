module.exports = function(sequelize, DataTypes) {
  var attendance = sequelize.define('attendance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    day_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }
);
  return attendance;
};
