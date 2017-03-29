angular.module("common.services").factory("unitphotoService", ["$http", "$q", "appSettings", unitphotoService]);
function unitphotoService($http, $q, appSettings) {

    var accessToken = sessionStorage.getItem('accessToken');

    this.addUnitPhoto = function (model, uploadedFile) {           
        var response = $http({
            url: appSettings.serverPath + "/addUnitPhoto",
            method: "POST",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                formData.append("file", data.files);
                return formData;
            },
            //data: { model: $scope.model, files: $scope.files },
            //file: $scope.files
            data: { model: model, files: uploadedFile },
            file: uploadedFile,
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.getAllUnitPhoto = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/unitphotos/getall",
            method: "GET",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.getByIdUnitPhoto = function (unitphotoId) {
        var response = $http({
            url: appSettings.serverPath + "/api/unitphotos/" + unitphotoId,
            method: "GET",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.editUnitPhoto = function (model, uploadedFile) {
        var response = $http({
            url: appSettings.serverPath + "/editUnitPhoto",
            method: "POST",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                formData.append("file", data.files);
                return formData;
            },
            data: { model: model, files: uploadedFile },
            file: uploadedFile,
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.deleteUnitPhoto = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/unitphotos/" + id,
            method: "DELETE",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };


    return {
        addUnitPhoto: this.addUnitPhoto,
        getAllUnitPhoto: this.getAllUnitPhoto,
        getByIdUnitPhoto: this.getByIdUnitPhoto,
        editUnitPhoto: this.editUnitPhoto,
        deleteUnitPhoto: this.deleteUnitPhoto
    }
}