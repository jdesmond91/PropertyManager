angular.module("common.services").factory("facilityService", ["$http", "$q", "appSettings", facilityService]);
function facilityService($http, $q, appSettings) {

    this.addFacility = function (facility) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/facilities",
            method: "POST",
            data: facility,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllFacility = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/facilities",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdFacility = function (facilityId) {
        var response = $http({
            url: appSettings.serverPath + "/api/facilities/" + facilityId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editFacility = function (facility, facilityId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/facilities/" + facilityId,
            method: "PUT",
            data: facility,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addFacility: this.addFacility,
        getAllFacility: this.getAllFacility,
        getByIdFacility: this.getByIdFacility,
        editFacility: this.editFacility
    }


}