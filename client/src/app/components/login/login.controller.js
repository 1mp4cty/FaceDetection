(function() {
  'use strict';

  angular
    .module('client')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http, send, $log, $state, $scope) {
    var vm = this;
    vm.user = {};

    vm.login = function(){
      $log.debug('---------LOGGIN IN-----------');
      send.request('/auth/local/login', 'POST', vm.user)
        .then(
          function(res){
            $log.debug('/auth/local/login POST', res.message);
            $scope.$emit('changeLoggedIn')
            $state.go('app.profile')
          },
          function(err){
            $log.debug('error', err);
          });
    }
  }
})();
