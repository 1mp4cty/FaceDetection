/**
 * Sequelize initialization module
 */

'use strict';
var config = require('../config/environment')
var Sequelize = require('sequelize')

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.user,
    config.sequelize.pass,
    config.sequelize.options)
};


var models = [
  'user',
  'attendance',
  'face',
  'class',
  'day'
];
var set_database = function(){
  if (db[models[0]]) return

  models.forEach(function(model) {
		if (!db[model]){

			db[model] = db.sequelize.import('../api/' + model + '/' + model + '.model.js');
			db[model].sync();
		}
	})

}();

var set_relations = function(){
  var User = db.user,
      Attendance = db.attendance,
      Day = db.day,
      Class = db.class,
      Face = db.face

      User.hasMany(Class, {as: 'lessons', foreignKey: 'teacher_id'})
      Class.belongsTo(User, {as: 'teacher', foreignKey: 'teacher_id'})

      Class.hasMany(Day, {as: 'days', foreignKey: 'class_id'})
      Day.belongsTo(Class, {as: 'class', foreignKey: 'class_id'})

      User.hasMany(Attendance, {as: 'studenterino', foreignKey: 'student_id'})
      Attendance.belongsTo(User, {as: 'students', foreignKey: 'student_id'})

      Day.hasMany(Attendance, {as: 'attended', foreignKey: 'day_id'})
      Attendance.belongsTo(Day, {as: 'day', foreignKey: 'day_id'})

      Day.hasMany(Face, {as: 'faces', foreignKey: 'day_id'})
      Face.belongsTo(Day, {as: 'day', foreignKey: 'day_id'})




}();

module.exports = db;
