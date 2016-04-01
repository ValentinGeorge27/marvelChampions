angular.module('marvel')
    .service('AllianceService', ['$q', '$http', function($q, $http){
        return {
            currentAlliance: function () {
                return angular.fromJson(localStorage.getItem('alliance'));
            },
            checkAlliance: function(user_id){
                var d = $q.defer();
                $http.get('/alliances/check_alliance', {
                    params: {
                        user_id: user_id
                    }
                }).success(function (resp) {
                    if(resp.found)
                        localStorage.setItem('alliance', JSON.stringify(resp.alliance));
                    else
                        window.localStorage.removeItem('alliance');
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            create: function(alliance, user_id){
                var d = $q.defer();
                $http.post('/alliances',{
                    alliance: alliance,
                    user_id: user_id
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
            getAllianceUsers: function (user_id) {
                var d = $q.defer();
                $http.get('/alliances/get_users',{
                    params: {
                        user_id: user_id
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
            promoteUser: function (currentUser_id, user_id, alliance_id) {
                var d = $q.defer();
                $http.put('/alliances/'+alliance_id+'/change_user_role',{
                    requester_id: currentUser_id,
                    user_id: user_id,
                    role: 'promote'
                }).success(function (resp) {
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            demoteUser: function (currentUser_id, user_id, alliance_id) {
                var d = $q.defer();
                $http.put('/alliances/'+alliance_id+'/change_user_role',{
                    requester_id: currentUser_id,
                    user_id: user_id,
                    role: 'demode'
                }).success(function (resp) {
                    d.resolve(resp);
                }).error(function (resp) {
                    d.resolve(resp);
                });
                return d.promise;
            },
            changeOwner: function (currentUser_id, user_id, alliance_id) {
                var d = $q.defer();
                $http.put('/alliances/'+alliance_id+'/change_owner',{
                    requester_id: currentUser_id,
                    user_id: user_id
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