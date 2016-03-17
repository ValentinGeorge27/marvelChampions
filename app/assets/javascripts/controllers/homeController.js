angular.module('marvel')
    .controller('HomeController', ['$scope', '$state', 'CurrentUser','AuthService', function($scope, $state, currentUser, AuthService){
        $scope.user = currentUser;

        $scope.logout = function() {
            console.log($scope.user);
            AuthService.logout();
            $state.go('login');
        };
    }]);