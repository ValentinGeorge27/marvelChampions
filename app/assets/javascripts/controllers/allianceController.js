angular.module('marvel')
    .controller('AllianceController',['$scope', '$state', 'Alliance', 'AllianceService','errorService','notify',
        function($scope, $state, allianceFactory, allianceService, errorService, notify){
        $scope.alliance = allianceFactory;
        $scope.alliance_users = [];

        allianceService.checkAlliance().then(function (response) {
            if(response.found === true) {
                $scope.alliance.set(response.alliance);
            }
            allianceService.getAllianceUsers().then(function (response) {
                angular.copy(response.users, $scope.alliance_users);
            });
            //question!
            console.log($scope.alliance_users);
        });

        $scope.createAlliance = function(){
            allianceService.createAlliance($scope.alliance).then(function () {
                $scope.alliance = allianceService.currentAlliance();
                    $state.go('alliance');
            }, function(data, status) {
                errorService.failure( data, status, $scope);
            });
        };

        $scope.updateAlliance = function () {
            allianceService.updateAlliance($scope.alliance).then(function () {
                notify('Alliance updated');
            })
        }
    }]);