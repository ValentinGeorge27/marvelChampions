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
                    d.resolve(resp.user);
                }).error(function(resp) {
                    $rootScope.$emit(AuthEvents.loginFailed);
                    d.reject(resp);
                });
                return d.promise;
            },
            logout: function(){
                console.log('logout');
                authToken.unset('user');
                authToken.unset('auth_token');
            },
            register: function(user){
                var d = $q.defer();
                $http.post('/users', {
                    user: user
                }).success(function(resp) {
                    authToken.set(resp.auth_token, resp.user);
                    d.resolve(resp.user);
                }).error(function(resp) {
                    $rootScope.$emit(AuthEvents.loginFailed);
                    d.reject(resp.error);
                });
                return d.promise;
            }
        };
    }]);