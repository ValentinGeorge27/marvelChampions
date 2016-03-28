angular.module('marvel')
    .directive('resetField',['$compile', function ($compile) {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {},
            link: function (scope, element) {
                var template = $compile('<i ng-show="enabled" class="fa fa-times-circle" ng-click="username = null"></i>')(scope);
                element.after(template);
            }
        }
    }]);