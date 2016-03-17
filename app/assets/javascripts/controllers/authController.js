angular.module('marvel')
    .controller('AuthController', ['$scope', '$state', 'AuthService', 'errorService',
        function($scope, $state, AuthService, errorService){

            $scope.errors = {message: null, errors: {}};

            $scope.login = function() {
                AuthService.login($scope.user.email, $scope.user.password).then(function(){
                    $state.go('home');
                }, function(data, status) {
                    errorService.failure( data, status, $scope);
                });
            };

            $scope.register = function() {
                AuthService.register($scope.user).then(function(){
                    $state.go('home');
                }, function(data, status) {
                    errorService.failure( data, status, $scope);
                });
            };

            $scope.reset_users = function(registerForm) {
                $scope.user = { email: null, username: null, password: null };
                registerForm.$setPristine();
            };
        }]);
