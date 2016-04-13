angular.module('marvel')
    .controller('TimeController', ['$scope', 'Days', 'Hours', 'TimeAvailability', 'TimeAvailabilityService','notify',
        function($scope, days, hours, timeAvailability, timeAvailabilityService, notify){
        $scope.hours = hours;
        $scope.days= days;

        $scope.time = [];

        timeAvailabilityService.getTime().then(function(response){
            if(response.time !== undefined)
                $scope.time = response.time;
        });

        $scope.toggleActive = function(hour, day){
            if($scope.findInTime(hour,day)){
                timeAvailability.set(day, hour, true);
                $scope.time.push(timeAvailability.get());
            }
            else{
                for(var i=0;i< $scope.time.length; i++){
                    if(angular.equals($scope.time[i].day, day)){
                        if(angular.equals($scope.time[i].hour, hour)){
                            $scope.time.splice(i,1);
                        }
                    }
                }
            }
        };

        $scope.findInTime = function(hour, day){
            if($scope.time.length === 0){
                return true;
            }
            else{
                for(var i=0;i< $scope.time.length; i++){
                    if(angular.equals($scope.time[i].day, day)){
                        if(angular.equals($scope.time[i].hour, hour)){
                            return false;
                        }
                    }
                }
                return true;
            }
        };

        $scope.saveTime = function(){
            timeAvailabilityService.saveTime($scope.time).then(function (response) {
                notify(response.success);
            });
        }
    }]);