angular.module("propertyManagerApp").controller("unitController", ["$scope", "$filter", "unitService", "userProfile", unitController]);

function unitController($scope, $filter, unitService, userProfile) {

    $scope.status = "";
    $scope.bedrooms = "";
    $scope.bathrooms = "";
    $scope.squareft = "";
    $scope.maxOccupants = "";
    $scope.balcony = "";
    $scope.dishwasher = "";
    $scope.laundry = "";
    $scope.message = "";
    $scope.units = [];

    $scope.addUnit = function () {

        if ($scope.balcony == 'Y') {
            $scope.balcony = true;
        }
        else {
            $scope.balcony = false;
        }

        if ($scope.dishwasher == 'Y') {
            $scope.dishwasher = true;
        }
        else {
            $scope.dishwasher = false;
        }

        if ($scope.laundry == 'Y') {
            $scope.laundry = true;
        }
        else {
            $scope.laundry = false;
        }

        var unit = {
            Status: $scope.status,
            Bedrooms: $scope.bedrooms,
            Bathrooms: $scope.bathrooms,
            SquareFeet: $scope.squareft,
            MaxOccupants: $scope.maxOccupants,
            Balcony : $scope.balcony,
            Dishwasher : $scope.dishwasher,
            Laundry : $scope.laundry
        };

        var addResults = unitService.addUnit(unit);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.serviceId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getUnit = function () {
        var allResults = unitService.getAllUnit();
        allResults.then(function (response) {
            $scope.units = response.data;
            console.log($scope.units);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getUnitById = function () {
        var resultById = unitService.getByIdUnit($scope.unitId);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.status = response.data.Status;
            $scope.bedrooms = response.data.Bedrooms;
            $scope.bathrooms = response.data.Bathrooms;
            $scope.squareft = response.data.SquareFeet;
            $scope.maxOccupants = response.data.MaxOccupants;
            $scope.balcony = response.data.Balcony;
            $scope.dishwasher = response.data.Dishwasher;
            $scope.laundry = response.data.Laundry;

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editUnit = function () {

        if ($scope.balcony == 'Y') {
            $scope.balcony = true;
        }
        else {
            $scope.balcony = false;
        }

        if ($scope.dishwasher == 'Y') {
            $scope.dishwasher = true;
        }
        else {
            $scope.dishwasher = false;
        }

        if ($scope.laundry == 'Y') {
            $scope.laundry = true;
        }
        else {
            $scope.laundry = false;
        }

        var unit = {
            Id: $scope.unitId,
            Status: $scope.status,
            Bedrooms: $scope.bedrooms,
            Bathrooms: $scope.bathrooms,
            SquareFeet: $scope.squareft,
            MaxOccupants: $scope.maxOccupants,
            Balcony: $scope.balcony,
            Dishwasher: $scope.dishwasher,
            Laundry: $scope.laundry
        };

        var editResults = unitService.editUnit(unit, $scope.unitId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function


}