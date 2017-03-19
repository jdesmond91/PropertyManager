angular.module("propertyManagerApp").controller("apartmentController", ["$scope", "$filter", "apartmentService", "userProfile", apartmentController]);

function apartmentController($scope, $filter, apartmentService, userProfile) {

    $scope.aptNumber = "";
    $scope.floorNumber = "";
    $scope.status = "";
    $scope.unitId = "";
    $scope.unitType = "";
    $scope.message = "";
    $scope.apartments = [];
    $scope.sortType = "ApartmentNumber";
    $scope.sortReverse = false;
    $scope.searchApartment = "";

    $scope.addApartment = function () {

        var apartment = {
            ApartmentNumber: $scope.aptNumber,
            FloorNumber: $scope.floorNumber,
            UnitId: $scope.unitId,
        };

        var addResults = apartmentService.addApartment(apartment);
        addResults.then(function (response) {
            console.log(response.data);
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getApartment = function () {
        var allResults = apartmentService.getAllApartment();
        allResults.then(function (response) {
            $scope.apartments = response.data;
            console.log($scope.apartments);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getApartmentById = function (id) {
        var resultById = apartmentService.getByIdApartment(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.aptNumber = response.data.ApartmentNumber;
            $scope.floorNumber = response.data.FloorNumber;
            $scope.status = response.data.Status;
            $scope.unitId = response.data.UnitId;
            $scope.unitType = response.data.Unit.Bedrooms;
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editApartment = function () {

        var apartment = {
            ApartmentNumber: $scope.aptNumber,
            FloorNumber: $scope.floorNumber,
            UnitId: $scope.unitId,
        };

        var editResults = apartmentService.editApartment(apartment, $scope.aptNumber);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getApartment();

}