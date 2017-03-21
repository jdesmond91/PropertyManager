angular.module("propertyManagerApp").controller("apartmentController", ["$scope", "$filter", "apartmentService", "unitService", "userProfile", apartmentController]);

function apartmentController($scope, $filter, apartmentService, unitService, userProfile) {

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

    getApartment();

    $scope.units = [];

    function getUnits() {
        var allResults = unitService.getAllUnit();
        allResults.then(function (response) {
            $scope.units = response.data;
            console.log($scope.units);
        }, function (error) {
            $scope.message = response.statusText;
        })
    }

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

    function getApartment() {
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

    //EDIT SECTION
    $scope.isEdit = false;

    $scope.changeEdit = function () {
        $scope.isEdit = false;
    }

    $scope.cancelEdit = function () {
        $scope.isEdit = false;
    }

    $scope.editClick = function (apt) {
        $scope.model = {
            floorNumber: apt.FloorNumber,
            status: apt.Status,
            unitId: apt.UnitId
        };
        $scope.isEdit = true;

        getUnits();
    }

    $scope.editApartment = function (apt) {

        var apartment = {
            ApartmentNumber: apt.ApartmentNumber,
            FloorNumber: $scope.model.floorNumber,
            Status: $scope.model.status,
            UnitId: $scope.model.unitId,
        };

        console.log(apartment);

        var editResults = apartmentService.editApartment(apartment, apt.ApartmentNumber);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);       
        })
        .then(function () {
            $scope.isEdit = false;
            getApartment();
        }, function (error) {
            $scope.message = response.statusText;
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    

}