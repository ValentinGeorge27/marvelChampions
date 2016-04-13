angular.module('marvel')
    .directive('myModal', ['$rootScope',function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: 'MyModalController',
            controllerAs: 'modalIns',
            templateUrl: 'myModal/myModalTemplate.html',
            link: function (scope, el, attr, controller) {
                $rootScope.$on(
                    'modal.open',
                    function (event, modalType) {
                        controller.modalService.shouldShow = true;
                        controller.modalService.template = modalType;
                    }
                );
                $rootScope.$on(
                    'modal.close',
                    function () {
                        controller.modalService.shouldShow = false;
                        controller.modalService.template = '';
                    }
                )
            }
        }
    }]);
