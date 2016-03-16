marvel = angular.module('marvel', [
    'ui.router',
    'templates'
    ]);

marvel.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: "index.html",
            controller: 'HomeController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'auth/_login.html',
            controller: 'AuthController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'auth/_register.html',
            controller: 'AuthController'
        });

    $urlRouterProvider.otherwise('login');

}]);

