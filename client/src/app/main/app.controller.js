(function() {
  'use strict';

  angular
    .module('client')
    .controller('AppController', AppController);

  /** @ngInject */
  function AppController(config, send, $scope) {
    var vm = this;
    vm.route = "";
    if (config.env === 'dev') vm.route = config.dev.host;
    if (config.env === 'app') vm.route = config.app.host;

    vm.LoggedIn = true;

      vm.checkLog = function(){
        send.request('/auth/local/', 'GET')
          .then(function(res) {
            if (res === 'true') vm.LoggedIn = true;
          }, function(err) {
            if (err) vm.LoggedIn = false;
          })
      }();

    $scope.$on('changeLoggedIn', vm.checkLog);

    vm.logout = function(){
      send.request('/auth/local/logout', 'GET')
      .then(function(res) {
        vm.LoggedIn = false;
      }, function(err) {
        if (err) vm.LoggedIn = false;
      })
    }

  }
})();
