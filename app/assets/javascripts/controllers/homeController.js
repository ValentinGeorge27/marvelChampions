angular.module('marvel')
    .controller('HomeController', ['$scope', '$state', 'CurrentUser','AuthService', function($scope, $state, currentUser, AuthService){
        $scope.user = currentUser;

        $scope.logout = function() {
            AuthService.logout();
            $state.go('login');
        };
    }]);