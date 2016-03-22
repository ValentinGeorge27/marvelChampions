angular.module('marvel')
    .service('AllianceService', ['$q', '$http','CurrentUser', function($q, $http, currentUser){
        return {
            currentAlliance: function () {
                return angular.fromJson(localStorage.getItem('alliance'));
            },
            checkAlliance: function(){
                var d = $q.defer();
                $http.get('/alliances/check_alliance', {
                    params: {
                        user_id: currentUser.id
                    }
                }).success(function (resp) {
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            createAlliance: function(alliance){
                var d = $q.defer();
                $http.post('/alliances',{
                    alliance: alliance,
                    user_id: currentUser.id
                }).success(function (resp) {
                    localStorage.setItem('alliance', JSON.stringify(resp));
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            }
        };
    }]);