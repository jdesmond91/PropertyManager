angular.module("propertyManagerApp").controller("serviceController", ["$scope", "$filter", "serviceService", "userProfile", serviceController]);

function serviceController($scope, $filter, serviceService, userProfile) {

    $scope.name = "";
    $scope.companyName = "";
    $scope.phoneNumber = "";
    $scope.email = "";
    $scope.address = "";
    $scope.message = "";
    $scope.services = [];
    $scope.sortType = "name";
    $scope.sortReverse = false;
    $scope.searchService = "";

    $scope.addService = function () {

        var service = {
            ServiceName: $scope.name,
            CompanyName: $scope.companyName,
            PhoneNumber: $scope.phoneNumber,
            Email: $scope.email,
            Address: $scope.address
        };

        var addResults = serviceService.addService(service);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.serviceId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getService = function () {
        var allResults = serviceService.getAllService();
        allResults.then(function (response) {
            $scope.services = response.data;
            console.log($scope.services);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getServiceById = function () {
        var resultById = serviceService.getByIdService($scope.serviceId);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.name = response.data.ServiceName;
            $scope.companyName = response.data.CompanyName;
            $scope.phoneNumber = response.data.PhoneNumber;
            $scope.email = response.data.Email;
            $scope.address = response.data.Address;
          
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editService = function () {

        var service = {
            Id: $scope.serviceId,
            ServiceName: $scope.name,
            CompanyName: $scope.companyName,
            PhoneNumber: $scope.phoneNumber,
            Email: $scope.email,
            Address: $scope.address
        };

        var editResults = serviceService.editService(service, $scope.serviceId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getService();

}