var sqldb = require('../../sqldb')
var Photo = sqldb.photo;
var request = require('superagent')
var config = require('../config/environment')

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res, next){
  var id = req.params.id;
  Photo.findAll({
    where: {
      teacher_id: id
    },
    limit: 10,
    order: 'createdAt DESC'
  })
    .then(function (photos) {
      res.status(200).json(photos);
      return null;
    })
    .catch(function(err) {
      console.log(err)
      res.status(500).end;
      return null
    })
}

exports.create = function (req, res, next) {
  var newPhoto = newPhoto.build(req.body)
  var request_body = {
		url: image_url
	};
	request
		.post(this.API_URL + "/detections")
		.query({analyzesFaceLandmarks: true})
		.query({analyzesAge: true})
		.query({analyzesGender: true})
		.query({analyzesHeadPose: true})
		.set('Content-Type', 'application/json')
		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
		.send(request_body)
		.end(function(error, response) {
			if(!error && response.statusCode == 200) {
				return callback(null, response.body);
			} else {
				return callback(error);
			}
	});
}

exports.update = function (req, res, next) {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  Photo.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.json({ message: 'Success' })
    return null
  }).catch(function(err) {
    console.log('err in Photo.update()',err)
    handleError(res);
    return null
  });
}

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Photo.destroy({
    where:{
      id: id
    }
  })
    .then(function () {
      res.json({ message: 'Success' })
      return null
    }).catch(function(err) {
      console.log('err in Photo.destroy()',err)
      handleError(res);
      return null
    })

}

exports.indentify = function(req, res, next) {
  var request_body = {
    faceIds: face_ids,
    personGroupId: group_id,
    maxNumOfCandidatesReturned: limit
  };
	request
		.post(config.API_URL + "/identifications")
		.set('Content-Type', 'application/json')
		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
		.send(request_body)
		.end(function(error, response) {
			if(!error && response.statusCode == 200) {
				return callback(null, response.body);
			} else {
				return callback(error);
			}
	});
}

exports.personGroup = function(req, res, next) {
  var request_body = {
		faceIds: face_ids,
		name: person_name,
		userData: ""
	};
	request
		.post(config.API_URL + "/persongroups/" + group_id + "/persons")
		.set('Content-Type', 'application/json')
		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
		.send(request_body)
		.end(function(error, response) {
			if(!error && response.statusCode == 200) {
				return callback(null, response.body);
			} else {
				return callback(error);
			}
	});
}
