var sqldb = require('../../sqldb')
var Day = sqldb.day;
var photo = require('../photo')

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  var id = req.params.id;
  Day.findAll({
    where: {
      teacher_id: id
    },
    limit: 10,
    order: 'createdAt DESC'
  })
    .then(function (days) {
      res.status(200).json(days);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.create = function (req, res, next) {
  var newDay = Day.build(req.body)
  newDay.save()
    .then(function() {
      res.json({ message: 'Success' })
      return null
    }).catch(function(err) {
      console.log('err in newDay.save()',err)
      handleError(res)
      return null
    });
}

exports.update = function (req, res, next) {
  console.log('req.file', req.file)
  req.body.photo = req.file.originalname
  Day.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.json({ message: 'Success' })
    return null
  }).catch(function(err) {
    console.log('err in Day.update()',err)
    handleError(res);
    return null
  })
  photo.detect('http://cola.unh.edu/sites/cola.unh.edu/files/styles/homepage/public/images/homepagePhotoFRLrev.jpg?itok=wdJ0UxSm', function(err, res) {
    if (err) {
      console.log('ERROR occured', err)
      return
    }
      console.log('Incoming Response from FACE API', JSON.stringify(res, null, '\t'));
  })
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Day.destroy({
    where:{
      id: id
    }
  })
    .then(function () {
      res.json({ message: 'Success' })
      return null
    }).catch(function(err) {
      console.log('err in Class.destroy()',err)
      handleError(res);
      return null
    })

}
