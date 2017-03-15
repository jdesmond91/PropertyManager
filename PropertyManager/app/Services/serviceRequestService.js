angular.module("common.services").factory("serviceRequestService", ["$http", "$q", "appSettings", serviceRequestService]);
function serviceRequestService($http, $q, appSettings) {

    this.addServiceRequest = function (serviceRequest) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/ServiceRequests",
            method: "POST",
            data: serviceRequest,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllServiceRequest = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/ServiceRequests",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdServiceRequest = function (serviceRequestId) {
        var response = $http({
            url: appSettings.serverPath + "/api/ServiceRequests/" + serviceRequestId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editServiceRequest = function (serviceRequest, serviceRequestId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/ServiceRequests/" + serviceRequestId,
            method: "PUT",
            data: serviceRequest,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addServiceRequest: this.addServiceRequest,
        getAllServiceRequest: this.getAllServiceRequest,
        getByIdServiceRequest: this.getByIdServiceRequest,
        editServiceRequest: this.editServiceRequest
    }


}