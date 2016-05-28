module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define('student', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }
);
  return student;
};
