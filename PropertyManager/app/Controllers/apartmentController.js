angular.module("propertyManagerApp").controller("apartmentController", ["$scope", "$filter", '$location', "$routeParams", "apartmentService", "unitService", "userProfile", apartmentController]);

function apartmentController($scope, $filter, $location, $routeParams, apartmentService, unitService, userProfile) {
   
    $scope.unitType = "";
    $scope.message = "";
    $scope.apartments = [];
    $scope.units = [];
    $scope.sortType = "ApartmentNumber";
    $scope.sortReverse = false;
    $scope.searchApartment = "";

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    if ($routeParams.apartment_id) {
        $scope.editId = $routeParams.apartment_id;
        $scope.isEdit = true;
        getApartmentById($scope.editId);
    }     
    else{
        getApartment();
    }

    getUnits();

    $scope.modelAdd = {
        aptNumber: 0,
        floorNumber: 0,
        status: "",
        unitId: "",
        unitType: 0
    };

    $scope.modelEdit = {
        aptNumber: 0,
        floorNumber: 0,
        status: "",
        unitId: "",
        unitType: 0
    };

    $scope.addOneClick = function () {
        $location.path('/addapartment');
    }

     $scope.addApartment = function () {

        var apartment = {
            ApartmentNumber: $scope.modelAdd.aptNumber,
            FloorNumber: $scope.modelAdd.floorNumber,
            Status: $scope.modelAdd.status,
            UnitId: $scope.modelAdd.unitId,
        };

        var addResults = apartmentService.addApartment(apartment);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.aptNumber = response.data.ApartmentNumber;
            $scope.modelAdd.unitType = response.data.Unit.Bedrooms
            $scope.showConfirmation = true;
            $scope.message = "Apartment Added"
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

     } // close function

     $scope.addAnother = function () {
         $scope.modelAdd = {
             aptNumber: 0,
             floorNumber: 0,
             status: "",
             unitId: 0,
             unitType: 0
         };
         $scope.message = "";
         $scope.form.$setPristine();
         $scope.showConfirmation = false;
     }

    //******************************************************************************************//

    //GET ALL
    function getApartment() {
        var allResults = apartmentService.getAllApartment();
        allResults.then(function (response) {
            $scope.apartments = response.data;
            console.log($scope.apartments);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    function getApartmentById (id) {
        var resultById = apartmentService.getByIdApartment(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.modelEdit.aptNumber = response.data.ApartmentNumber;
            $scope.modelEdit.floorNumber = response.data.FloorNumber;
            $scope.modelEdit.status = response.data.Status;
            $scope.modelEdit.unitId = response.data.UnitId;
            $scope.modelEdit.unitType = response.data.Unit.Bedrooms;
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    $scope.editClick = function (id) {
        $location.path('/addapartment/' + id);
    }

    $scope.editApartment = function () {

        var apartment = {
            ApartmentNumber: $scope.modelEdit.aptNumber,
            FloorNumber: $scope.modelEdit.floorNumber,
            Status: $scope.modelEdit.status,
            UnitId: $scope.modelEdit.unitId,
        };

        console.log(apartment);

        var editResults = apartmentService.editApartment(apartment, $scope.modelEdit.aptNumber);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
            $scope.message = "Edit successful";
            $scope.showEditConfirmation = true;      
        }, function (error) {
            $scope.message = response.statusText;      
        });
    } // close function

    //************** DELETE ************************
    $scope.delete = function (id) {
        var deleteOne = apartmentService.deleteApartment(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getApartment();
        }, function (error) {
            $scope.message = response.statusText;
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/apartment');
    }

    $scope.goBack = function () {
        $location.path('/apartment');
    }

    function getUnits() {
        var allResults = unitService.getAllUnit();
        allResults.then(function (response) {
            $scope.units = response.data;
            console.log($scope.units);
        }, function (error) {
            $scope.message = response.statusText;
        })
    }

    

}