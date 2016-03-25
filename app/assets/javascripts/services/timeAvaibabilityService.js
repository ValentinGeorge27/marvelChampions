angular.module('marvel')
    .service('TimeAvailabilityService', ['$q', '$http','CurrentUser', function($q, $http, currentUser){
        return {
            saveTime: function(time){
                var d = $q.defer();
                $http.post('/users/' + currentUser.id + '/time_availabilities', {
                    time_availability: {
                        time: time
                    }
                }).success(function(resp){
                    d.resolve(resp);
                }).error(function(resp){
                    d.resolve(resp);
                });
                return d.promise;
            },
            getTime: function (){
                var d = $q.defer();
                $http.get('/users/'+currentUser.id+'/time_availabilities')
                    .success(function(resp){
                        d.resolve(resp);
                    })
                    .error(function(resp){
                        d.resolve(resp);
                    });
                return d.promise;
            }
        }
    }]);