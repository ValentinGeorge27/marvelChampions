marvel = angular.module('marvel', [
    'ui.router',
    'templates'
    ]);

marvel.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'nav/nav.html',
                    controller: 'HomeController'
                }
            }
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
        })
        .state('home.allianceQuest', {
            url: 'allianceQuest',
            views: {
                'content@': {
                    templateUrl: 'alliance_quest/_mainQuest.html',
                    controller: 'QuestController'
                }
            }
        })
        .state('home.allianceWar', {
            url: 'allianceWar',
            views: {
                'content@': {
                    templateUrl: 'alliance_war/_mainWar.html',
                    controller: 'WarController'
                }
            }
        });



}]);

