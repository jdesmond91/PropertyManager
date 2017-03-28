angular.module("common.services").factory("unitphotoService", ["$http", "$q", "appSettings", unitphotoService]);
function unitphotoService($http, $q, appSettings) {

    this.addUnitPhoto = function (unitPhoto) {
        var accessToken = sessionStorage.getItem('accessToken');
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/unitphotos",
            method: "POST",
            data: unitPhoto,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllUnitPhoto = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/unitphotos",
            method: "GET",
        });
        return response;
    };

    this.getByIdUnitPhoto = function (unitphotoId) {
        var response = $http({
            url: appSettings.serverPath + "/api/unitphotos/" + unitphotoId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editUnitPhoto = function (unitPhoto, unitphotoId) {
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/unitphotos/" + unitphotoId,
            method: "PUT",
            data: unitPhoto,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.setPhoto = function (photoFile, unitphotoId) {
      var response = 
        $http({
            url: appSettings.serverPath + "/api/unitphotos/" + unitphotoId + "/setphoto",
            method: "PUT",
            data: photoFile,
            headers: { 'Content-Type': "image/jpeg" },
            transformRequest: angular.identity
        }).then(function (response) {
            console.log(response);
        }, function (err) {
            console.log(err);
        });
        return response;
    };

    return {
        addUnitPhoto: this.addUnitPhoto,
        getAllUnitPhoto: this.getAllUnitPhoto,
        getByIdUnitPhoto: this.getByIdUnitPhoto,
        editUnitPhoto: this.editUnitPhoto,
        setPhoto: this.setPhoto
    }
}