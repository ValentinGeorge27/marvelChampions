angular.module('marvel')
    .factory('TimeAvailability',function(){
        var time_availability={
            day: '',
            hour: '',
            isActive: false
        };

        time_availability.set = function(day, hour, isActive){
            time_availability = {
                day: day,
                hour: hour,
                isActive: isActive
            }
        };

        time_availability.setKey = function(key, value){
            time_availability.key = value;
        };

        time_availability.get = function(){
            return time_availability;
        };

        return time_availability;
    });