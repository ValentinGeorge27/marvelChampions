angular.module('marvel')
    .controller('HomeController', ['$scope', '$state', 'CurrentUser','AuthService', 'AllianceService', 
        function($scope, $state, currentUser, AuthService, allianceService){
        $scope.user = currentUser;

        $scope.status = false;
        allianceService.checkAlliance().then(function (response) {
            console.log(allianceService.currentAlliance());
            $scope.status = response.found;
        });

        $scope.logout = function() {
            console.log($scope.user);
            AuthService.logout();
            $state.go('login');
        };
    }]);