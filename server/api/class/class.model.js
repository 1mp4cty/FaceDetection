module.exports = function(sequelize, DataTypes) {
  var classe = sequelize.define('class', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }
);
  return classe;
};
