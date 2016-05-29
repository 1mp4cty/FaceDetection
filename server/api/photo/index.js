var request = require('superagent')
var config = require('../../config/environment')

exports.detect = function (image, callback) {
  var request_body = {
		url: image
	};
	request
		.post(config.API_URL + '/detect')
		// .query({analyzesFaceLandmarks: true})
		// .query({analyzesAge: true})
		// .query({analyzesGender: true})
		// .query({analyzesHeadPose: true})
		.set('Content-Type', 'application/json')
		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
		.send(request_body)
		.end(function(error, response) {
			if(!error && response.statusCode == 200) {
        return callback(null, response.body)
			} else {
        return callback(error)
			}
	});
}

// exports.indentify = function(req, res, next) {
//   var request_body = {
//     faceIds: face_ids,
//     personGroupId: group_id,
//     maxNumOfCandidatesReturned: limit
//   };
// 	request
// 		.post(config.API_URL + "/identifications")
// 		.set('Content-Type', 'application/json')
// 		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
// 		.send(request_body)
// 		.end(function(error, response) {
// 			if(!error && response.statusCode == 200) {
// 				return callback(null, response.body);
// 			} else {
// 				return callback(error);
// 			}
// 	});
// }
//
// exports.personGroup = function(req, res, next) {
//   var request_body = {
// 		faceIds: face_ids,
// 		name: person_name,
// 		userData: ""
// 	};
// 	request
// 		.post(config.API_URL + "/persongroups/" + group_id + "/persons")
// 		.set('Content-Type', 'application/json')
// 		.set('Ocp-Apim-Subscription-Key', config.API_PRIMARY_KEY)
// 		.send(request_body)
// 		.end(function(error, response) {
// 			if(!error && response.statusCode == 200) {
// 				return callback(null, response.body);
// 			} else {
// 				return callback(error);
// 			}
// 	});
// }
