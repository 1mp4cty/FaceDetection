(function(){
  'use strict';

  angular
    .module('client')
    .controller('SignUpController', SignUpController);

    /** @ngInject */
    function SignUpController (send, $log, $timeout){
      var vm = this;
      vm.user = {}
      vm.differentPassword = false;
      vm.success = false;

      vm.check = function() {
        if (vm.user.confirmPassword && vm.user.password && vm.user.password === vm.user.confirmPassword){
          vm.differentPassword = false;
          vm.register();
        }
        else {
          vm.differentPassword = true;
          $timeout(vm.callAtTimeout, 5000);
        }
      }

      vm.register = function(){
        send.request('/auth/local/', 'POST', vm.user)
          .then(function(res){
            $log.debug('/api/auth/local POST',res);
            vm.success = true;
            vm.user = {};
          }, function(err){
            $log.debug('/api/auth/local POST',err);
            vm.error = true;
            $timeout(vm.callAtTimeout, 5000);
          })
      }
      vm.callAtTimeout = function(){
        vm.differentPassword = false;
        vm.success = false;
        vm.error = false;
      }
    }

})();
