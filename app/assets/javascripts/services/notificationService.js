angular.module('marvel')
    .service('NotificationService',['$q','$http',function ($q, $http) {
        return {
            checkNotifications: function (user_id) {
                var d = $q.defer();
                $http.get('/notifications/user_notifications',{
                    params: {
                        user_id: user_id
                    }
                }).success(function (response) {
                    d.resolve(response);
                }).error(function (response) {
                    d.resolve(response);
                });
                return d.promise;
            }
        }
    }]);