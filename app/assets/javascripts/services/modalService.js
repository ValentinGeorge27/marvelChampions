angular.module('marvel')
    .service('ModalService', [ '$rootScope', '$q', function ($rootScope, $q) {
        var modal = {
            shouldShow: false,
            template: ''
        };

        return({
            open: open,
            close: close
        });


        function open(params){
            modal.template = params.templateUrl;
            $rootScope.$emit('modal.open', modal.template);
        }

        function close(){
            $rootScope.$emit('modal.close');
        }
    }]);