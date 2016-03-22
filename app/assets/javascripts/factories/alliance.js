angular.module('marvel')
    .factory('Alliance', function(){
        var alliance= {
            name: '',
            description: ''
        };

        alliance.set = function(newAlliance){
            alliance = {
                name: newAlliance.name,
                description: newAlliance.description
            }
        };

        return alliance;
    });