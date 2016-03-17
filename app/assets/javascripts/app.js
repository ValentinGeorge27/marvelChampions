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
                },
                'content@': {
                    templateUrl: 'user/profile.html',
                    controller: 'HomeController'
                }
            },
            data: { requireLogin: true }
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
            },
            data: { requireLogin: true }
        })
        .state('home.allianceWar', {
            url: 'allianceWar',
            views: {
                'content@': {
                    templateUrl: 'alliance_war/_mainWar.html',
                    controller: 'WarController'
                }
            },
            data: { requireLogin: true }
        });

}])
    .run(['$rootScope', '$location', '$state', 'CurrentUser', function($rootScope, $location, $state, currentUser){
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){

            var shouldLogin = toState.data !== undefined && currentUser && toState.data.requireLogin;

            if(shouldLogin){
                $state.go('login');
                /*event.preventDefault();*/
            }
            /*if(currentUser !== null){
                if(toState.name === 'login')
                {
                    $state.go('home');
                }
            }*/
        })
    }]);

