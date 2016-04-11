angular.module('marvel')
    .factory('SocketService', [function () {
        return new WebSocketRails('localhost:3000/websocket');
    }]);