(function() {
  'use strict';

  angular
    .module('client')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(config) {
    var vm = this;
    vm.route = "";
    if (config.env === 'dev') vm.route = config.dev.host;
    if (config.env === 'app') vm.route = config.app.host;

  }
})();
