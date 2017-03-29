angular.module("propertyManagerApp").controller("unitController", ["$scope", "$filter", '$location', "$routeParams", "unitService", "unitphotoService", "userProfile", unitController]);

function unitController($scope, $filter, $location, $routeParams, unitService, unitphotoService, userProfile) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    $scope.unitPhotos = [];
    $scope.files = [];
    $scope.file = "";

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
    $scope.units = [];
    $scope.sortType = "bedrooms";
    $scope.sortReverse = false;
    $scope.searchUnit = "";

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addunit');
    }

    //$scope.addUnit = function () {      

    //    var unit = {
    //        Bedrooms: $scope.modelAdd.bedrooms,
    //        Bathrooms: $scope.modelAdd.bathrooms,
    //        SquareFeet: $scope.modelAdd.squareFt,
    //        MaxOccupants: $scope.modelAdd.maxOccupants,
    //        Balcony: $scope.modelAdd.balcony,
    //        Dishwasher: $scope.modelAdd.dishwasher,
    //        Laundry: $scope.modelAdd.laundry
    //    };

    //    var addResults = unitService.addUnit(unit);
    //    addResults.then(function (response) {
    //        console.log(response.data);
    //        $scope.modelAdd.unitId = response.data.Id;
    //        $scope.showConfirmation = true;
    //        $scope.message = "Unit Added"
    //    }, function (error) {
    //        $scope.message = error.statusText + " " + error.status;
    //    });

    //} // close function

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
            return response;
        }).then(function(response){
            $scope.photomodel = {
                UnitId: $scope.modelAdd.unitId,
                Description: $scope.description,
                PathName: ""
            };
            var photo = unitphotoService.addUnitPhoto($scope.photomodel, $scope.file);
            photo.then(function (response) {
                console.log(response);
                $scope.photomodel.PathName = "/Album/FileUploads/" + $scope.file.name;
            }, function (error) {
                $scope.message = error.statusText + " " + error.status;
            })
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
            $scope.message = response.statusText;
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
            $scope.message = error.statusText;
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
            $scope.message = error.statusText;
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/unit');
    }

    $scope.goBack = function () {
        $location.path('/unit');
    }

    // *************************************************** UNIT PHOTO *****************************************************
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection  
            //$scope.files.push(args.file);
            $scope.file = args.file;
        });
    });

    $scope.addUnitPhoto = function () {
        $scope.photomodel = {
            UnitId: $scope.modelAdd.unitId,
            Description: $scope.modelAdd,
            PathName: ""
        };
        var photo = unitphotoService.addUnitPhoto($scope.photomodel, $scope.file);
        photo.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    };

    function getUnitPhotoById () {
        var resultById = unitphotoService.getByIdUnitPhoto(1);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.imageUrl = response.data.PathName;
            $scope.description = response.data.Description;
            $scope.unitId = response.data.UnitId;
        }, function (error) {
            $scope.message = response.statusText;
        })
    } // close function

}