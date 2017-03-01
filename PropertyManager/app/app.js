angular.module("propertyManagerApp", ['ngRoute', 'common.services'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.hashPrefix('');
                $routeProvider
                .when('/home', {
                    controller: 'homeController',
                    templateUrl: 'app/Index.html'
                })
                .when('/login', {
                    controller: 'loginController',
                    templateUrl: 'app/Partials/login.html'
                })
                .when('/register/', {
                    controller: 'loginController',
                    templateUrl: 'app/Partials/register.html'
                })
                .when('/announcement/', {
                     controller: 'announcementController',
                     templateUrl: 'app/Partials/announcement.html'
                })
                .when('/facility/', {
                     controller: 'facilityController',
                     templateUrl: 'app/Partials/facility.html'
                 })
                .otherwise({ redirectTo: '/home' });
            }]);