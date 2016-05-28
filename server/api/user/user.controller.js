var sqldb = require('../../sqldb')
var User = sqldb.user
var Class = sqldb.class
var Attendance = sqldb.attendance
var Day = sqldb.day

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  var id = req.user;
  User.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['password', 'updatedAt']
    }
  })
    .then(function (User) {
      res.status(200).json(User);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.show = function(req, res, next){
  var user_id = req.params.id;
  User.find({
    where: {
      id: user_id
    }
  })
    .then(function (user) {
      if (!user) {
        res.status(404).json({ message: 'Not Found'})
        return null
      }
      else {
        if (user.type === 'teacher'){
          User.find({
            where: {
              id: user_id
            },
            include: {
              model: Class,
              as: 'lessons',
              include: {
                model: Day,
                as: 'days',
                include: {
                  model: Attendance,
                  as: 'attended',
                  include: {
                    model: User,
                    as: 'students'
                  }
                }
              }
            }
          }).then(function(User) {
            console.log('User',User.dataValues);
            res.status(200).json(User);
            return null
          }).catch(function(err) {
            console.log('err in User.find()',err)
            handleError(res);
            return null
          });
        }
        if (user.type === 'student'){
          User.find({
            where: {
              id: user_id
            },
            include: {
              model: Class,
              as: 'lessons',
              include: {
                model: Day,
                as: 'days'
              }
            }
          })
          .then(function(User) {
            console.log('User',User.dataValues);
            res.status(200).json(User);
            return null
          }).catch(function(err) {
            console.log('err in User.find()',err)
            handleError(res);
            return null
          });
        }
        // console.log('User',User.dataValues);
        // res.status(200).json(User);
        // return null
      }

    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.update = function (req, res, next) {
  delete req.body.createdAt;
  delete req.body.updatedAt;
  if (req.file && req.body.top) req.body.setDataValue("pic", req.file.originalname)

  User.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.json({ message: 'Success' })
    return null
  }).catch(function(err) {
    console.log('err in User.update()',err)
    handleError(res);
    return null
  });
}

// exports.destroy = function (req, res, next) {
//   var id = req.params.id;
//   User.destroy({
//     where:{
//       id: id
//     }
//   })
//
//     .then(function () {
//       res.json({ message: 'Success' })
//       return null
//     }).catch(function(err) {
//       console.log('err in User.update()',err)
//       handleError(res);
//       return null
//     })
//
// }
