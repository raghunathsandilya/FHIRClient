angular.module('myApp.read', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/read', {
                templateUrl: 'read/read.html',
                controller: 'readCtrl'
            });
    }])
    .controller('readCtrl', [function() {

    }]);
