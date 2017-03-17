angular.module("propertyManagerApp").controller("unitphotoController", ["$scope", "$filter", "unitphotoService", "userProfile", unitphotoController]);

function unitphotoController($scope, $filter, unitphotoService, userProfile) {

    $scope.name = "";
    $scope.description = "";
    $scope.unitId = "";
    $scope.message = "";
    $scope.unitPhotos = [];

    $scope.addUnitPhoto = function () {  

        var unitPhoto = {
            Name: $scope.name,
            Description: $scope.description,
            UnitId: $scope.unitId,
        };

        var addResults = unitphotoService.addUnitPhoto(unitPhoto);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.unitphotoId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getUnitPhoto = function () {
        var allResults = unitphotoService.getAllUnitPhoto();
        allResults.then(function (response) {
            $scope.unitPhotos = response.data;
            console.log($scope.unitPhotos);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getUnitPhotoById = function () {
        var resultById = unitphotoService.getByIdUnitPhoto($scope.unitphotoId);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.name = response.data.Name;
            $scope.description = response.data.Description;
            $scope.unitId = response.data.UnitId;
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editUnitPhoto = function () {
  
        var unitPhoto = {
            Id: $scope.unitphotoId,
            Name: $scope.name,
            Description: $scope.description,
            UnitId: $scope.unitId,
        };

        var editResults = unitphotoService.editUnitPhoto(unitPhoto, $scope.unitphotoId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    var fd;
    var reader;
    $scope.uploadFile = function (files) {
        reader = new FileReader();
        reader.onload = function (e) {
            console.log("about to encode");
            $scope.encoded_file = btoa(e.target.result.toString());
        };
        reader.readAsBinaryString(files[0]);
        //fd = new FormData();
        //fd.append("file", files[0])
    };

    $scope.addPhoto = function(){
            var addPhoto = unitphotoService.setPhoto(reader, $scope.unitphotoId);
            addPhoto.then(function (response) {
                console.log("added");
                console.log(response);
            }, function (error) {
                $scope.message = response.statusText;
            });
    }
       

}