angular.module('marvel')
    .factory('Alliance', function(){
        var alliance= {
            id: '',
            name: '',
            description: ''
        };

        alliance.set = function(newAlliance){
            alliance.id = newAlliance.id;
            alliance.name = newAlliance.name;
            alliance.description = newAlliance.description;
        };

        return alliance;
    });