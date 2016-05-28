(function() {
  'use strict';

  var config = {
    app: {
      host: 'http://127.0.0.1/api' // Your own host as IP or something
    },
    dev: {
      host: 'http://localhost:8081/api'
    },
    env: 'dev' // I'm running it on dev mode always you can simply change this to change app so it runs on Production Mode
  }

  angular
    .module('client')
    .constant('config', config);

})();
