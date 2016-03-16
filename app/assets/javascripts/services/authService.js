angular.module('marvel')
    .service("AuthService", ['$http','$q', '$rootScope', 'AuthToken', 'AuthEvents', function($http, $q, $rootScope, authToken, AuthEvents) {
        return {
            login: function(email, password) {
                var d = $q.defer();
                $http.post('/auth', {
                    email: email,
                    password: password
                }).success(function(resp) {
                    authToken.set(resp.auth_token, resp.user);
                    $rootScope.$broadcast(AuthEvents.loginSuccess);
                    d.resolve(resp.user);
                }).error(function(resp) {
                    $rootScope.$broadcast(AuthEvents.loginFailed);
                    d.reject(resp);
                });
                return d.promise;
            },
            logout: function(){
                console.log('logout');
                authToken.unset('auth_token');
                authToken.unset('user');
            },
            register: function(user){
                authToken.unset();
                var d = $q.defer();
                $http.post('/users', {
                    user: user
                }).success(function(resp) {
                    authToken.set(resp.auth_token, resp.user);
                    $rootScope.$broadcast(AuthEvents.loginSuccess);
                    d.resolve(resp.user);
                }).error(function(resp) {
                    $rootScope.$broadcast(AuthEvents.loginFailed);
                    d.reject(resp.error);
                });
                return d.promise;
            }
        };
    }]);