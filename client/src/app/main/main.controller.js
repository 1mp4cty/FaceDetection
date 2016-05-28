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

  function fileModel ($parse){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var model = $parse(attrs.fileModel);
        var modelSetter =  model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          })
        })
      }
    }
  }
})();
