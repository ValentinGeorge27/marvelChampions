angular.module('marvel')
    .directive('modal',['ngDialog',function(ngDialog){
        return {
            restrict: 'E',
            template: '<a href="" ng-click="openModal()">Create Alliance</a>',
            replace: true,
            scope: true,
            controller: function($scope) {
                $scope.openModal = function() {
                    ngDialog.openConfirm({
                        template: 'alliance/create_alliance_modal.html',
                        controller: 'AllianceController'
                    });
                }
            }
        }
    }]);