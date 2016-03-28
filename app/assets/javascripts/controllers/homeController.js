angular.module('marvel')
    .controller('HomeController', ['$scope', '$state', 'CurrentUser','AuthService', 'AllianceService', 'NotificationService', 'ModalService',
        function($scope, $state, currentUser, AuthService, allianceService, notificationService, ModalService){
            $scope.user = currentUser;

            $scope.status = {
                alliance: false
            };
            allianceService.checkAlliance().then(function (response) {
                console.log(allianceService.currentAlliance());
                $scope.status.alliance = response.found;
            });

            $scope.createAllianceModal= function () {
                ModalService.showModal({
                    templateUrl: 'alliance/create_alliance_modal.html',
                    controller: 'AllianceController'
                }).then(function(modal){
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };

            $scope.logout = function() {
                console.log($scope.user);
                AuthService.logout();
                $state.go('login');
            };
    }]);