marvel = angular.module('marvel', [
    'ui.router',
    'templates',
    'ngResource',
    'ngDialog',
    'cgNotify'
    ]);

marvel.config(['ngDialogProvider', '$stateProvider', '$urlRouterProvider', function(ngDialogProvide, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'nav/nav.html',
                    controller: 'HomeController'
                },
                'content': {
                    templateUrl: 'user/user_index.html',
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
        .state('alliance', {
            url: '/alliance',
            views: {
                'header': {
                    templateUrl: 'nav/nav.html',
                    controller: 'HomeController'
                },
                'content': {
                    templateUrl: 'alliance/alliance_index.html'
                }
            },
            data: { requireLogin: true }
        })
        .state('alliance.general', {
            url: '/general',
            views: {
                'alliance-view': {
                    templateUrl: 'alliance/general.html'
                }
            },
            data: { requireLogin: true }
        })
        .state('alliance.allianceQuest', {
            url: '/allianceQuest',
            views: {
                'alliance-view': {
                    templateUrl: 'alliance_quest/_mainQuest.html',
                    controller: 'QuestController'
                }
            },
            data: { requireLogin: true }
        })
        .state('alliance.allianceWar', {
            url: '/allianceWar',
            views: {
                'alliance-view': {
                    templateUrl: 'alliance_war/_mainWar.html',
                    controller: 'WarController'
                }
            },
            data: { requireLogin: true }
        })
        .state('home.profile', {
            url: 'user/profile',
            views: {
                'user-view':{
                    templateUrl: 'user/profile.html',
                    controller: 'UserController'
                }
            }
        })
        .state('home.time_availability', {
            url: 'user/time_availability',
            views: {
                'user-view':{
                    templateUrl: 'user/time_availability.html'
                }
            }
        });

        ngDialogProvide.setDefaults({
            showClose: true,
            closeByDocument: true,
            closeByEscape: true
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

