angular.module('marvel')
    .service('UserService',['$q','$http', function ($q, $http) {
        return {
            checkUsername: function (userName) {
                var d = $q.defer();
                $http.get('/users/check_username', {
                    params: {
                        username: userName
                    }
                })
                .success(function (response) {
                    d.resolve(response);
                })
                .error(function (response) {
                    d.resolve(response);
                });
                return d.promise;
            },
            acceptAllianceRequest: function (notification_id, user_id) {
                var d = $q.defer();
                $http.put('/users/'+user_id+'/accept_request', {
                    notification_id: notification_id
                }).success(function (response) {
                    localStorage.setItem('alliance', JSON.stringify(response.alliance));
                    d.resolve(response);
                }).error(function (response) {
                    d.resolve(response);
                });
                return d.promise;
            },
            rejectAllianceRequest: function (notification_id, user_id) {
                var d = $q.defer();
                $http.put('/users/'+user_id+'/reject_request', {
                        notification_id: notification_id
                }).success(function (response) {
                    window.localStorage.removeItem('alliance');
                    d.resolve(response);
                }).error(function (response) {
                    d.resolve(response);
                });
                return d.promise;
            },
            leaveAlliance: function (user_id, alliance_id) {
                var d = $q.defer();
                $http.post('/users/'+user_id+'/leave_alliance', {
                    alliance_id: alliance_id
                }).success(function (response) {
                    window.localStorage.removeItem('alliance');
                    d.resolve(response);
                }).error(function (response) {
                    d.resolve(response);
                });
                return d.promise;
            }
        }
    }]);