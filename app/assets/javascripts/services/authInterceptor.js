angular.module('marvel')
    .factory("AuthInterceptor", ['$q', '$injector', function($q, $injector) {
        return {
            // This will be called on every outgoing http request
            request: function(config) {
                var AuthToken = $injector.get("AuthToken");
                var token = AuthToken.get('auth_token');
                config.headers = config.headers || {};
                if (token) {
                    config.headers.Authorization = "Bearer " + token;
                }
                return config || $q.when(config);
            },
            // This will be called on every incoming response that has en error status code
            responseError: function(response) {
                var AuthEvents = $injector.get('AuthEvents');
                var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/auth'));
                if (!matchesAuthenticatePath) {
                    $injector.get('$rootScope').$emit({
                        401: AuthEvents.notAuthenticated,
                        403: AuthEvents.notAuthorized,
                        419: AuthEvents.sessionTimeout
                    }[response.status], response);
                }
                return $q.reject(response);
            }
        };
    }])
    .config(function($httpProvider) {
        return $httpProvider.interceptors.push("AuthInterceptor");
    });