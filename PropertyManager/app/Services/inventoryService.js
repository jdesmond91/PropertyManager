angular.module("common.services").factory("inventoryService", ["$http", "$q", "appSettings", inventoryService]);
function inventoryService($http, $q, appSettings) {

    this.addInventory = function (inventory) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/inventory",
            method: "POST",
            data: inventory,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllInventory = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/inventory",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdInventory = function (inventoryId) {
        var response = $http({
            url: appSettings.serverPath + "/api/inventory/" + inventoryId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editInventory = function (inventory, inventoryId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/inventory/" + inventoryId,
            method: "PUT",
            data: inventory,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.deleteInventory = function (id) {
        var response = $http({
            url: appSettings.serverPath + "/api/inventory/" + id,
            method: "DELETE",
            //headers: authHeaders
        });
        return response;
    };

    return {
        addInventory: this.addInventory,
        getAllInventory: this.getAllInventory,
        getByIdInventory: this.getByIdInventory,
        editInventory: this.editInventory,
        deleteInventory: this.deleteInventory
    }


}