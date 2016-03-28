angular.module('marvel')
    .controller('NotificationController', [ '$scope', 'NotificationService','CurrentUser','ModalService','UserService', 'notify',
        function ($scope, notificationService, currentUser, ModalService, userService, notify) {
            $scope.notifications = {};

            notificationService.checkNotifications(currentUser.id).then(function (response) {
                if(response.notifications.length != 0){
                    $scope.notifications = response.notifications;
                }
            });

            $scope.showNotificationsModal = function () {
                ModalService.showModal({
                    templateUrl: 'notifications/show_modal.html',
                    controller: 'NotificationController'
                }).then(function(modal){
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result);
                    });
                });
            };
            
            $scope.acceptRequest = function (notification_id) {
                userService.acceptAllianceRequest(notification_id, currentUser.id).then(function (response) {
                    if(response.success){
                        console.log('test');
                        console.log($scope.$parent.status.alliance);
                        $scope.$parent.status.alliance = true;
                        notify(response.success);
                    }
                    else
                        notify(response.error);

                })
            };
            
            $scope.rejectRequest = function (notification_id) {
                userService.rejectAllianceRequest(notification_id, currentUser.id).then(function (response) {
                    if(response.success)
                        notify(response.success);
                    else
                        notify(response.error);
                })
            }
    }]);