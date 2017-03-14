angular.module("common.services").factory("unitService", ["$http", "$q", "appSettings", unitService]);
function unitService($http, $q, appSettings) {

    this.addUnit = function (unit) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/units",
            method: "POST",
            data: unit,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllUnit = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/units",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdUnit = function (unitId) {
        var response = $http({
            url: appSettings.serverPath + "/api/units/" + unitId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editUnit = function (unit, unitId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/units/" + unitId,
            method: "PUT",
            data: unit,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addUnit: this.addUnit,
        getAllUnit: this.getAllUnit,
        getByIdUnit: this.getByIdUnit,
        editUnit: this.editUnit
    }


}