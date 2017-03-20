angular.module("propertyManagerApp", ['ngRoute', 'common.services'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider.hashPrefix('');
                $routeProvider
                .when('/index', {
                    controller: 'homeController',
                    templateUrl: 'app/Index.html'
                })
                .when('/home', {
                    controller: 'homeController',
                    templateUrl: 'app/Partials/home.html'
                 })
                .when('/login', {
                    controller: 'loginController',
                    templateUrl: 'app/Partials/login.html'
                })
                .when('/register/', {
                    controller: 'registerController',
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
                 .when('/bookfacility/', {
                     controller: 'facilityBookingController',
                     templateUrl: 'app/Partials/facilityBookings.html'
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
                .when('/lease/', {
                     controller: 'leaseController',
                     templateUrl: 'app/Partials/lease.html'
                })
                .when('/employee/', {
                     controller: 'employeeController',
                     templateUrl: 'app/Partials/employee.html'
                })
                .when('/workorderrequest/', {
                     controller: 'workOrderController',
                     templateUrl: 'app/Partials/workorderrequest.html'
                })
                 .when('/inventory/', {
                     controller: 'inventoryController',
                     templateUrl: 'app/Partials/inventory.html'
                 })
                  .when('/servicerequest/', {
                      controller: 'serviceRequestController',
                      templateUrl: 'app/Partials/servicerequest.html'
                  })
                .otherwise({ redirectTo: '/index' });
            }]);