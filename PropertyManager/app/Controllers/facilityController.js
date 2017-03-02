angular.module("propertyManagerApp").controller("facilityController", ["$scope", "$filter", "facilityService", "userProfile", facilityController]);

function facilityController($scope, $filter, facilityService, userProfile) {

    $scope.name = "";
    $scope.description = "";
    $scope.location = "";
    $scope.status = "";
    $scope.openTime = "";
    $scope.closeTime = "";
    $scope.message = "";
    $scope.facilities = [];

    $scope.addFacility = function () {

        var openTimeFiltered = null;
        var expireDateFiltered = null;

        if ($scope.openTime != "") {
            openTimeFiltered = $filter('date')($scope.openTime, 'HH:mm:ss');
        }
        if ($scope.closeTime != "") {
            expireDateFiltered  = $filter('date')($scope.closeTime, 'HH:mm:ss');
        }
        
        var facility = {
            FacilityName: $scope.name,
            Description: $scope.description,
            Location: $scope.location,
            Status: $scope.status,
            OpenTime: openTimeFiltered,
            CloseTime: expireDateFiltered
        };

        var addResults = facilityService.addFacility(facility);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.facilityId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getFacility = function () {
        var allResults = facilityService.getAllFacility();
        allResults.then(function (response) {
            $scope.facilities = response.data;
            console.log($scope.facilities);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getFacilityById = function () {
        var resultById = facilityService.getByIdFacility($scope.facilityId);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.name = response.data.FacilityName;
            $scope.description = response.data.Description;
            $scope.location = response.data.Location;
            $scope.status = response.data.Status;
            $scope.openTime = new Date(response.data.OpenTime.replace('T', ' ').replace('-', '/'));
            $scope.closeTime = new Date(response.data.CloseTime.replace('T', ' ').replace('-', '/'));
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editFacility = function () {

        var openTimeFiltered = $filter('date')($scope.openTime, 'HH:mm:ss');
        var expireDateFiltered = $filter('date')($scope.closeTime, 'HH:mm:ss');

        var facility = {
            Id: $scope.facilityId,
            FacilityName: $scope.name,
            Description: $scope.description,
            Location: $scope.location,
            Status: $scope.status,
            OpenTime: openTimeFiltered,
            CloseTime: expireDateFiltered
        };

        var editResults = facilityService.editFacility(facility, $scope.facilityId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function


}