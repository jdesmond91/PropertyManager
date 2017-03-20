angular.module("propertyManagerApp").controller("tenantController", ["$scope", "$filter", "tenantService", "userProfile", "leaseService", tenantController]);

function tenantController($scope, $filter, tenantService, userProfile, leaseService) {

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.mobileNumber = "";
    $scope.email = "";
    $scope.homeNumber = "";
    $scope.birthDate = "";
    $scope.apartmentNumber = "";
    $scope.message = "";
    $scope.tenants = [];
    $scope.sortType = 'FirstName';
    $scope.sortReverse = false;
    $scope.searchTenant = "";

    $scope.addTenant = function () {

        var birthDateFiltered = null;

        if ($scope.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");
        }

        var tenant = {
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            MobilePhone: $scope.mobileNumber,
            HomePhone: $scope.homeNumber,
            Email: $scope.email,
            BirthDate: birthDateFiltered
        };

        var addResults = tenantService.addTenant(tenant);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.tenantId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getTenant = function () {
        var allResults = tenantService.getAllTenant();
        allResults.then(function (response) {
            $scope.tenants = response.data;
            console.log($scope.tenants);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getTenantById = function (id) {
        var resultById = tenantService.getByIdTenant(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.firstName = response.data.FirstName;
            $scope.lastName = response.data.LastName;
            $scope.mobileNumber = response.data.MobilePhone;
            $scope.email = response.data.Email;
            $scope.homeNumber = response.data.HomePhone;
            $scope.birthDate = new Date(response.data.BirthDate.replace('T', ' ').replace('-', '/'));
            return response.data.Id;
        }).then(function (tenantId){
            var leaseInfo = leaseService.getLeaseByTenantId(tenantId);
            leaseInfo.then(function (response) {
                console.log(response);
                $scope.apartmentNumber = response.data.Apartment.ApartmentNumber;
            }, function (error) {
                $scope.message = response.statusText;
            })
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editTenant = function () {

        var birthDateFiltered = null;

        if ($scope.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");
        }

        var tenant = {
            Id: $scope.tenantId,
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            MobilePhone: $scope.mobileNumber,
            HomePhone: $scope.homeNumber,
            Email: $scope.email,
            BirthDate: birthDateFiltered
        };

        var editResults = tenantService.editTenant(tenant, $scope.tenantId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getTenant();

}