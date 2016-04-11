angular.module('marvel')
    .controller('NotificationController', [ '$scope', 'NotificationService','CurrentUser','ModalService','UserService', 'notify', 'SocketService',
        function ($scope, notificationService, currentUser, modalService, userService, notify, socketService) {
            $scope.notifications = [];
            /*notificationService.checkNotifications(currentUser.id).then(function (response) {
                if(response.notifications.length != 0){
                    $scope.notifications = response.notifications;
                }
            });*/
            var object_to_send = { data: currentUser.id };
            socketService.trigger('notifications.check', object_to_send);

            socketService.bind('notifications', function (data) {

                $scope.$apply(function () {
                    $scope.notifications = data.notifications;
                });
                console.log('received');
                console.log($scope.notifications);
            });

            var channel = socketService.subscribe('notif');
            channel.bind('new_notifications', function (data) {
                console.log('new-not');
                $scope.$apply(function () {
                    $scope.notifications = data.notifications;
                });
                console.log($scope.notifications);
            });

            console.log('Aloha');
            console.log($scope.notifications);

            $scope.showNotificationsModal = function () {
                modalService.open({
                    templateUrl: 'notifications/show_modal.html'
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