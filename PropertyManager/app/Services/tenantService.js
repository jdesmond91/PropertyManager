angular.module("common.services").factory("tenantService", ["$http", "$q", "appSettings", tenantService]);
function tenantService($http, $q, appSettings) {

    this.addTenant = function (tenant) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/tenants",
            method: "POST",
            data: tenant,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllTenant = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/tenants",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdTenant = function (tenantId) {
        var response = $http({
            url: appSettings.serverPath + "/api/tenants/" + tenantId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByEmailTenant = function (tenantEmail) {
        var response = $http({
            url: appSettings.serverPath + "/api/tenants/email/" + tenantEmail + "/find",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editTenant = function (tenant, tenantId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/tenants/" + tenantId,
            method: "PUT",
            data: tenant,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.deleteTenant = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/tenants/" + id,
            method: "DELETE",
            //headers: authHeaders
        });
        return response;
    };

    return {
        addTenant: this.addTenant,
        getAllTenant: this.getAllTenant,
        getByIdTenant: this.getByIdTenant,
        getByEmailTenant: this.getByEmailTenant,
        editTenant: this.editTenant,
        deleteTenant: this.deleteTenant
    }


}