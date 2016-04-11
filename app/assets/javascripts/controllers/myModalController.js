angular.module('marvel')
    .controller('MyModalController', ['$scope', 'ModalService', function ($scope, modalService) {
        var modal = this;
        modal.modalService = modalService;
    }]);