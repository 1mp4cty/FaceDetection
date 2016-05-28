(function() {
  'use strict';

  angular
    .module('client')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        abstract: true,
        template: '<div> \
                      <navbar></navbar> \
                    </div> \
                    <div ui-view> </div>',
        controller: 'AppController',
        controllerAs: 'app'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('app.mentor', {
        url: 'mentor/',
        templateUrl: 'app/components/mentor/mentor.html',
        controller: 'MentorController',
        controllerAs: 'MC'
      })
      .state('app.login', {
        url: 'login/',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'LC'
      })
      .state('app.signup', {
        url: 'signup/',
        templateUrl: 'app/components/signup/signup.html',
        controller: 'SignUpController',
        controllerAs: 'Sign'
      })
      .state('app.profile', {
        url: 'profile/',
        templateUrl: 'app/components/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'PC'
        // resolve: {
        //   login: onlyLogged
        // }
      })
      .state('app.mentorProfile', {
        url: 'mentorProfile/:id',
        templateUrl: 'app/components/mentor/mentor.profile.html',
        controller: 'MentorProfileController',
        controllerAs: 'MPC'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
  var onlyLogged = function ($q, $log, send){
    var defer = $q.defer();
    send.request('/auth/local/', 'GET')
      .then(function(res) {
        if (res) defer.resolve();
      }, function(err) {
        if (err) defer.reject();
      })

    return defer.promise;
  }

})();
