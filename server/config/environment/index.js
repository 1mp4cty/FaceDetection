'use strict';
var _ = require('lodash');
var path = require('path');

// All configurations will extend these options
// ============================================
var all = {
  API_PRIMARY_KEY: "9d762ccdd66548a0a7cc63af818b0340",

  API_URL: "https://api.projectoxford.ai/face/v1.0",

  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 8081,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'csports-secret'
  },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  // require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
