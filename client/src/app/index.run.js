(function() {
  'use strict';

  angular
    .module('client')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state) {
    $rootScope.$on('$stateChangeError', function() {
      $state.go('app.login');
    })
    $log.debug('runBlock end');
  }

})();
