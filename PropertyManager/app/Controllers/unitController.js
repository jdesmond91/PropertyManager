angular.module("propertyManagerApp").controller("unitController", ["$scope", "$filter", '$location', "$routeParams", "unitService", "userProfile", unitController]);

function unitController($scope, $filter, $location, $routeParams, unitService, userProfile) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    if ($routeParams.unit_id) {
        $scope.editId = $routeParams.unit_id;
        $scope.isEdit = true;
        getUnitById($scope.editId);
    }
    else {
        getUnit();
    }

    $scope.modelAdd = {
        unitId: "",
        bedrooms: "",
        bathrooms: "",
        squareFt: "",
        maxOccupants: "",
        balcony: false,
        dishwasher: false,
        laundry: false
    };

    $scope.modelEdit = {
        unitId: "",
        bedrooms: "",
        bathrooms: "",
        squareFt: "",
        maxOccupants: "",
        balcony: "",
        dishwasher: "",
        laundry: ""
    };

    $scope.message = "";
    $scope.errorMessage = "";
    $scope.units = [];
    $scope.sortType = "bedrooms";
    $scope.sortReverse = false;
    $scope.searchUnit = "";

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addunit');
    }

    $scope.addUnit = function () {      

        var unit = {
            Bedrooms: $scope.modelAdd.bedrooms,
            Bathrooms: $scope.modelAdd.bathrooms,
            SquareFeet: $scope.modelAdd.squareFt,
            MaxOccupants: $scope.modelAdd.maxOccupants,
            Balcony: $scope.modelAdd.balcony,
            Dishwasher: $scope.modelAdd.dishwasher,
            Laundry: $scope.modelAdd.laundry
        };

        var addResults = unitService.addUnit(unit);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.unitId = response.data.Id;
            $scope.showConfirmation = true;
            $scope.message = "Unit Added"
        }, function (error) {
            $scope.message = error.statusText + " " + error.status;
        });

    } // close function

    $scope.addAnother = function () {
        $scope.modelAdd = {
            unitId: "",
            bedrooms: "",
            bathrooms: "",
            squareFt: "",
            maxOccupants: "",
            balcony: false,
            dishwasher: false,
            laundry: false
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    // GET SECTION ***********************************************************************

    function getUnit () {
        var allResults = unitService.getAllUnit();
        allResults.then(function (response) {
            $scope.units = response.data;
            console.log($scope.units);
        }, function (error) {
            $scope.errorMessage = response.statusText;
        })

    } // close function

    function getUnitById (id) {
        var resultById = unitService.getByIdUnit(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.modelEdit.unitId = response.data.Id;
            $scope.modelEdit.bedrooms = response.data.Bedrooms;
            $scope.modelEdit.bathrooms = response.data.Bathrooms;
            $scope.modelEdit.squareFt = response.data.SquareFeet;
            $scope.modelEdit.maxOccupants = response.data.MaxOccupants;
            $scope.modelEdit.balcony = response.data.Balcony;
            $scope.modelEdit.dishwasher = response.data.Dishwasher;
            $scope.modelEdit.laundry = response.data.Laundry;

        }, function (error) {
            $scope.errorMessage = error.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    $scope.editClick = function (id) {
        $location.path('/addunit/' + id);
    }

    $scope.editUnit = function () {

        var unit = {
            Id: $scope.editId,
            Bedrooms: $scope.modelEdit.bedrooms,
            Bathrooms: $scope.modelEdit.bathrooms,
            SquareFeet: $scope.modelEdit.squareFt,
            MaxOccupants: $scope.modelEdit.maxOccupants,
            Balcony: $scope.modelEdit.balcony,
            Dishwasher: $scope.modelEdit.dishwasher,
            Laundry: $scope.modelEdit.laundry
        };

        var editResults = unitService.editUnit(unit, unit.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
            $scope.message = "Edit successful";
            $scope.showEditConfirmation = true;
        }, function (error) {
            $scope.message = error.statusText;
        });
    } // close function

    $scope.sorterFunc = function (unit) {
        return parseInt(unit.Bedrooms);
    };

    //************** DELETE ************************
    $scope.delete = function (id) {
        var deleteOne = unitService.deleteUnit(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getUnit();
        }, function (error) {
            $scope.errorMessage = "Could not delete";
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/unit');
    }

    $scope.goBack = function () {
        $location.path('/unit');
    }

}