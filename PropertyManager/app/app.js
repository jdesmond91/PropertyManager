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
                .when('/service/', {
                     controller: 'serviceController',
                     templateUrl: 'app/Partials/service.html'
                })
                .when('/unit/', {
                      controller: 'unitController',
                      templateUrl: 'app/Partials/unit.html'
                })
                .when('/apartment/', {
                     controller: 'apartmentController',
                     templateUrl: 'app/Partials/apartment.html'
                })
                .when('/tenant/', {
                     controller: 'tenantController',
                     templateUrl: 'app/Partials/tenant.html'
                })
                .when('/unitphoto/', {
                     controller: 'unitphotoController',
                     templateUrl: 'app/Partials/unitphoto.html'
                })
                .otherwise({ redirectTo: '/home' });
            }]);