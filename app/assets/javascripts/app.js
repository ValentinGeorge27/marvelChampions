marvel = angular.module('marvel', [
    'templates',
    'ngRoute'
    ]);

marvel.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "index.html"
        })
}]);

