angular.module('marvel')
    .factory('CurrentUser',['AuthToken', 'AllianceService', function(AuthToken, allianceService){
        var user = {};

        if(AuthToken.get('auth_token'))
        {
            user = angular.fromJson(AuthToken.get('user'));
            allianceService.checkAlliance(user.id).then(function (resp) {
                if(resp.found){
                    user.allianceRole = resp.user_role;
                    localStorage.setItem('user', JSON.stringify(user));
                }else {
                   localStorage.removeItem('alliance');
                }
            });
        }
        else
            localStorage.removeItem('user');

        user.remove = function () {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            localStorage.removeItem('alliance');
        };

        return user;
    }]);