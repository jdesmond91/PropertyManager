angular.module("common.services").factory("serviceService", ["$http", "$q", "appSettings", serviceService]);
function serviceService($http, $q, appSettings) {

    this.addService = function (service) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/services",
            method: "POST",
            data: service,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllService = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/services",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getAllServiceForRequest = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/services/allforrequest",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdService = function (serviceId) {
        var response = $http({
            url: appSettings.serverPath + "/api/services/" + serviceId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editService = function (service, serviceId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/services/" + serviceId,
            method: "PUT",
            data: service,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.deleteService = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/services/" + id,
            method: "DELETE",
            //headers: authHeaders
        });
        return response;
    };

    return {
        addService: this.addService,
        getAllService: this.getAllService,
        getByIdService: this.getByIdService,
        editService: this.editService,
        deleteService: this.deleteService,
        getAllServiceForRequest: this.getAllServiceForRequest
    }


}