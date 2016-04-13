angular.module('marvel')
    .controller('HomeController', ['$scope', '$state', 'CurrentUser','AuthService', 'AllianceService', 'NotificationService', 'ModalService',
        function($scope, $state, currentUser, AuthService, allianceService, notificationService, modalService){
            $scope.user = currentUser;

            $scope.status = {
                alliance: false
            };
            if(allianceService.currentAlliance() !== null)
                $scope.status.alliance = true;
            else
                $scope.status.alliance = false;

            $scope.createAllianceModal= function () {
                modalService.open({
                    templateUrl: 'alliance/create_alliance_modal.html'
                });
            };

            $scope.logout = function() {
                console.log($scope.user);
                AuthService.logout();
                $state.go('login');
            };
    }]);