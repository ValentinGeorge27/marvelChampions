angular.module('marvel')
    .controller('AllianceController',['$scope', '$state', 'Alliance', 'AllianceService','errorService', function($scope, $state, allianceFactory, allianceService, errorService){
        $scope.alliance = {name: '', description: '' };

        allianceService.checkAlliance().then(function (response) {
            if(response.found === true) {
                $scope.alliance.name = allianceService.currentAlliance().alliance.name;
                $scope.alliance.description = allianceService.currentAlliance().alliance.description;
            }
            console.log('here');
            console.log($scope.alliance);
        });

        $scope.createAlliance = function(){
            allianceService.createAlliance($scope.alliance).then(function () {
                $scope.alliance = allianceService.currentAlliance();
                    $state.go('alliance');
            }, function(data, status) {
                errorService.failure( data, status, $scope);
            });
        };
    }]);