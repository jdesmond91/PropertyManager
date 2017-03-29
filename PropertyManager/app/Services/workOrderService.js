angular.module("common.services").factory("workOrderService", ["$http", "$q", "appSettings", workOrderService]);
function workOrderService($http, $q, appSettings) {

    this.addWorkOrder = function (workOrder) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/WorkOrders",
            method: "POST",
            data: workOrder,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllWorkOrder = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/WorkOrders",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdWorkOrder = function (workOrderId) {
        var response = $http({
            url: appSettings.serverPath + "/api/WorkOrders/" + workOrderId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByTenantIdWorkOrder = function (tenantId) {
        var response = $http({
            url: appSettings.serverPath + "/api/workorders/tenant/" + tenantId + "/find",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editWorkOrder = function (workOrder, workOrderId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/WorkOrders/" + workOrderId,
            method: "PUT",
            data: workOrder,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.deleteWorkOrder = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/WorkOrders/" + id,
            method: "DELETE",
            //headers: authHeaders
        });
        return response;
    };

    return {
        addWorkOrder: this.addWorkOrder,
        getAllWorkOrder: this.getAllWorkOrder,
        getByIdWorkOrder: this.getByIdWorkOrder,
        editWorkOrder: this.editWorkOrder,
        getByTenantIdWorkOrder: this.getByTenantIdWorkOrder,
        deleteWorkOrder: this.deleteWorkOrder
    }


}