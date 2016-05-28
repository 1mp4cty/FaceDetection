var sqldb = require('../../sqldb')
var Face = sqldb.Face;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  var id = req.params.id;
  Face.findAll({
    where: {
      teacher_id: id
    },
    limit: 10,
    order: 'createdAt DESC'
  })
    .then(function (Faces) {
      res.status(200).json(Faces);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.create = function (req, res, next) {
  var newFace = Face.build(req.body)
  newFace.save()
    .then(function() {
      res.json({ message: 'Success' })
      return null
    }).catch(function(err) {
      console.log('err in newFace.save()',err)
      handleError(res)
      return null
    });
}

exports.update = function (req, res, next) {
  delete req.body.createdAt
  delete req.body.updatedAt
  req.body.setDataValue('photo', req.file.originalname)
  Face.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.json({ message: 'Success' })
    return null
  }).catch(function(err) {
    console.log('err in Face.update()',err)
    handleError(res);
    return null
  });
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Face.destroy({
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
