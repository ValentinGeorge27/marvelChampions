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
                    localStorage.setItem('alliance', JSON.stringify(resp));
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            create: function(alliance){
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
            },
            update: function (alliance) {
                var d = $q.defer();
                $http.put('/alliances/'+alliance.id, {
                    alliance: alliance
                }).success(function (resp) {
                    localStorage.setItem('alliance', JSON.stringify(resp));
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            getAllianceUsers: function () {
                var d = $q.defer();
                $http.get('/alliances/get_users',{
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
            addUser: function (username, alliance_id) {
                var d = $q.defer();
                $http.post('/alliances/'+alliance_id+'/add_user',{
                    username: username
                }).success(function (resp) {
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            kickUser: function (user_id, alliance_id) {
                var d = $q.defer();
                $http.delete('/alliances/'+alliance_id+'/kick_user', {
                    params: {
                        user_id: user_id
                    }
                }).success(function (response) {
                    d.resolve(response);
                }).error(function (response) {
                    d.resolve(response)
                });
                return d.promise;
            }
        };
    }]);