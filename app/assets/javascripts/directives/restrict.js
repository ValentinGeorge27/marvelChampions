angular.module('marvel')
    .directive('restrict', ['CurrentUser', function (currentUser) {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attr) {
                    var accessDenied = true;
                    var user = currentUser;

                    var attributes = attr.access.split(' ');
                    if(user.allianceRole !== undefined){
                        if(attributes) {
                            for (var i in attributes) {
                                if (user.allianceRole === attributes[i]) {
                                    accessDenied = false
                                }
                            }
                        }
                    }

                    if(accessDenied){
                        element.children().remove();
                        element.remove();
                    }
            }
        }
    }]);