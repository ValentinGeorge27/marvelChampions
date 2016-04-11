angular.module('marvel')
    .controller('AllianceController',['$scope', '$state', '$filter', 'Alliance', 'AllianceService','errorService','notify', 'UserService','CurrentUser', 'ModalService', 'AllianceRoles',
        function($scope, $state, $filter, allianceFactory, allianceService, errorService, notify, userService, currentUser, modalService, roles){
            $scope.alliance = allianceFactory;
            $scope.alliance_users = [];

            $scope.found_user = false;
            $scope.currentUser = currentUser;
            $scope.selectedUser = {};

            $scope.changeOwnerModal = function () {
                modalService.open({
                    templateUrl: 'alliance/change_owner_modal.html'
                });
            };

            if(allianceService.currentAlliance() !== undefined)
            {
                $scope.alliance = allianceService.currentAlliance();
            }

            if($scope.alliance) {
                allianceService.getAllianceUsers($scope.currentUser.id).then(function (response) {
                    angular.copy(response.users, $scope.alliance_users);
                    $scope.alliance_users = $filter('orderBy')($scope.alliance_users, 'role', roles);
                    console.log($scope.alliance_users);
                });
            }

            $scope.createAlliance = function(){
                allianceService.create($scope.alliance).then(function () {
                    $scope.alliance = allianceService.currentAlliance();
                        $state.go('alliance');
                }, function(data, status) {
                    errorService.failure( data, status, $scope);
                });
            };

            $scope.updateAlliance = function () {
                allianceService.update($scope.alliance).then(function () {
                    notify('Alliance updated');
                })
            };

            $scope.checkUsername = function (username) {
                if(username != null) {
                    userService.checkUsername(username).then(function (response) {
                        if (response.found) {
                            notify('User found');
                            $scope.found_user = true;
                        }
                        else {
                            notify('User not found');
                            $scope.found_user = false;
                        }
                    })
                }
            };

            $scope.add_user = function (username) {
                if (username != null){
                    allianceService.addUser(username, $scope.alliance.id).then(function (response) {
                        notify(response.success);
                    });
                }else
                    notify('Cannot add null username');
            };
            $scope.kick_user = function (user_id) {
                allianceService.kickUser(user_id, $scope.alliance.id).then(function (response) {
                    if (response.success)
                        notify(response.success);
                    else
                        notify(response.error);
                })
            };

            $scope.promote_user = function (user_id, index) {
                allianceService.promoteUser(currentUser.id, user_id, $scope.alliance.id).then(function (response) {
                    if(response.success) {
                        notify(response.success);
                        $scope.alliance_users[index] = response.user;
                    }else
                        notify(response.error);
                })
            };

            $scope.demote_user = function (user_id, index) {
                allianceService.demoteUser(currentUser.id, user_id, $scope.alliance.id).then(function (response) {
                    if(response.success) {
                        notify(response.success);
                        $scope.alliance_users[index] = response.user;
                    }else
                        notify(response.error);
                })
            };
            $scope.change_owner = function (username) {
                var selected_team_lead= $filter('filter')($scope.alliance_users, function (d) {
                    return d.username = username;
                })[0];
                allianceService.changeOwner(currentUser.id, selected_team_lead.id, $scope.alliance.id).then(function (response) {
                    if(response.success) {
                        notify(response.success);
                        $state.go('alliance.general');
                    }else
                        notify(response.error);
                })
            };

            $scope.leave_alliance = function (user_id) {
                userService.leaveAlliance(user_id, $scope.alliance.id).then(function (response) {
                    if (response.success){
                        notify(response.success);
                        $state.go('home');
                    } else
                        notify(response.error);
                })
            };
    }]);