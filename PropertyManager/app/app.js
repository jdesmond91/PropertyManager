angular.module("propertyManagerApp", ['ngRoute', 'ui.calendar', 'common.services', 'ui.bootstrap'])
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
                        templateUrl: 'app/Partials/Login/login.html'
                    })
                    .when('/register/', {
                        controller: 'registerController',
                        templateUrl: 'app/Partials/Login/register.html'
                    })
                    .when('/announcement/', {
                         controller: 'announcementController',
                         templateUrl: 'app/Partials/Announcement/announcement.html'
                    })
                    .when('/addannouncement/:announce_id?', {
                        controller: 'announcementController',
                        templateUrl: 'app/Partials/Announcement/announcementAdd.html'
                    })
                    .when('/facility/', {
                         controller: 'facilityController',
                         templateUrl: 'app/Partials/Facility/facility.html'
                    })
                     .when('/bookfacility/', {
                         controller: 'facilityBookingController',
                         templateUrl: 'app/Partials/Facility/facilityBookings.html'
                      })
                    .when('/service/', {
                         controller: 'serviceController',
                         templateUrl: 'app/Partials/Service/service.html'
                    })
                    .when('/unit/', {
                          controller: 'unitController',
                          templateUrl: 'app/Partials/Unit/unit.html'
                    })
                    .when('/apartment/', {
                         controller: 'apartmentController',
                         templateUrl: 'app/Partials/Apartment/apartment.html'
                    })
                    .when('/addapartment/:apartment_id?', {
                        controller: 'apartmentController',
                        templateUrl: 'app/Partials/Apartment/apartmentAdd.html'
                    })
                    .when('/tenant/', {
                         controller: 'tenantController',
                         templateUrl: 'app/Partials/Tenant/tenant.html'
                    })
                    .when('/lease/', {
                         controller: 'leaseController',
                         templateUrl: 'app/Partials/Lease/lease.html'
                    })
                    .when('/employee/', {
                         controller: 'employeeController',
                         templateUrl: 'app/Partials/Employee/employee.html'
                    })
                    .when('/workorderrequest/', {
                         controller: 'workOrderController',
                         templateUrl: 'app/Partials/WorkOrder/workorderrequest.html'
                    })
                     .when('/inventory/', {
                         controller: 'inventoryController',
                         templateUrl: 'app/Partials/Inventory/inventory.html'
                     })
                      .when('/servicerequest/', {
                          controller: 'serviceRequestController',
                          templateUrl: 'app/Partials/Service/servicerequest.html'
                      })
                    .otherwise({ redirectTo: '/index' });
            }]);