angular.module('marvel')
    .service('AllianceCRUDService',['$q','AllianceService', function ($q, allianceService) {
        return {
            create: function (alliance) {
                var d = $q.defer();
                allianceService.create(alliance).then(function () {
                    d.resolve(allianceService.currentAlliance());
                    $state.go('alliance');
                }, function(data, status) {
                    d.resolve(data);
                });
                return d.promise;
            }
        }
    }]);