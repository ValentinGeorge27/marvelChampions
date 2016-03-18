angular.module('marvel')
    .service('TimeAvailabilityService', ['$resource','TimeAvailability', 'CurrentUser', function($resource, timeAvailability, currentUser){
        return {
            save: function(time){
                var time_availability = new TimeAvailabilityService(time);
                time_availability.save();
            },
            get: function(){

            }
        }

    }]);