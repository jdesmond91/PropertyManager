angular.module("propertyManagerApp").controller("unitphotoController", ["$http", "$scope", "$filter", "$timeout",  "unitphotoService", "userProfile", unitphotoController]);

function unitphotoController($http, $scope, $filter, $timeout, unitphotoService, userProfile) {

   
   
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
            $scope.message = error.statusText;
            console.log(error);
        })

    } // close function

    $scope.files = [];

    //2. a simple model that want to pass to Web API along with selected files  
    $scope.model = {
        UnitId: 1,
        Description: "Multiple upload files",
        PathName: ""
    };
    //3. listen for the file selected event which is raised from directive  
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection  
            $scope.files.push(args.file);
        });
    });

    //4. Post data and selected files.  
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "http://localhost:24792/PostFileWithData",
            headers: { 'Content-Type': undefined },

            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
       
                }
                return formData;
            },
            data: { model: $scope.model, files: $scope.files },
            file: $scope.files
        }).
        then(function (response) {            
            console.log(response);
        }, function (err) {           
        });
    };




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


}