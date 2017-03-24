angular.module("common.services").factory("leaseService", ["$http", "$q", "appSettings", leaseService]);
function leaseService($http, $q, appSettings) {

    this.addLease = function (lease) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/leases",
            method: "POST",
            data: lease,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllLease = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/Leases",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdLease = function (leaseId) {
        var response = $http({
            url: appSettings.serverPath + "/api/Leases/" + leaseId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getLeaseByTenantId = function (tenantId) {
        var response = $http({
            url: appSettings.serverPath + "/api/leases/id/" + tenantId + "/find",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editLease = function (lease, leaseId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/Leases/" + leaseId,
            method: "PUT",
            data: lease,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.deleteLease = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/Leases/" + id,
            method: "DELETE",
            //headers: authHeaders
        });
        return response;
    };

    return {
        addLease: this.addLease,
        getAllLease: this.getAllLease,
        getByIdLease: this.getByIdLease,
        editLease: this.editLease,
        getLeaseByTenantId: this.getLeaseByTenantId,
        deleteLease: this.deleteLease
    }


}