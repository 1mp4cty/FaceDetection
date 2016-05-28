/**
 * Main application routes
 */

var errors    = require('./components/errors')
var path      = require('path')
var config    = require('./config/environment')
var express   = require('express')
var multer    = require('multer')

exports['default'] = function(app, passport) {

  app.use(function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __dirname + '/images/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({
    storage: storage
  })
  require('./auth')(app, passport)

  app.use('/api/image', upload.single('file'), require('./image_upload'))
  app.use('/api/images', express.static(__dirname + '/images'))
  // app.use('/api/rating', upload.single('avatar'), require('./api/rating'))
  app.use('/api/user', require('./api/user'))
  app.use('/api/class', upload.single('avatar'), require('./api/class'))
  app.use('/api/day', require('./api/day'))

  // app.use('/api/user', require('./api/user'))
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  app.route('/*')
    .get(function(req, res) {
      return res.sendFile(path.resolve(config.root, 'client/dist/index.html'));
    });
};
module.exports = exports['default'];
