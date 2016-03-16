angular.module('marvel')
    .factory('CurrentUser',['AuthToken', function(AuthToken){
        var user = {};
        if(AuthToken.get('auth_token'))
        {
            user = angular.fromJson(AuthToken.get('user'));
        }

        return user;
    }]);