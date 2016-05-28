var sqldb = require('../../sqldb')
var Class = sqldb.class;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  var id = req.params.id;
  Class.findAll({
    where: {
      teacher_id: id
    },
    limit: 10,
    order: 'createdAt DESC'
  })
    .then(function (classes) {
      res.status(200).json(classes);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.create = function (req, res, next) {
  var newClass = Class.build(req.body)
  newClass.save()
    .then(function() {
      res.json({ message: 'Success' })
      return null
    }).catch(function(err) {
      console.log('err in newClass.save()',err)
      handleError(res)
      return null
    });
}

exports.update = function (req, res, next) {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  Class.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.json({ message: 'Success' })
    return null
  }).catch(function(err) {
    console.log('err in Class.update()',err)
    handleError(res);
    return null
  });
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Class.destroy({
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
